import { Injectable } from "@nestjs/common";
import {
	CreateSubscriptionRequest,
	UpdateSubscriptionRequest,
	SubscriptionQuery,
} from "./dto";
import { SubscriptionModel } from "@db/models";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { SubscriptionNotFoundError } from "./errors";

@Injectable()
export class SubscriptionService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	async createOne(dto: CreateSubscriptionRequest) {
		const document = new SubscriptionModel({
			...dto,
			account: this.cls.get("account.id"),
		});
		return await document.save();
	}

	async findMany(query: SubscriptionQuery) {
		const filter: any = {};

		if (query.active !== undefined) {
			filter.active = query.active;
		}

		return await SubscriptionModel.find(filter).sort({ createdAt: -1 });
	}

	async findOne(subscriptionId: string) {
		const subscription = await SubscriptionModel.findOne({
			_id: subscriptionId,
		});

		if (!subscription) throw new SubscriptionNotFoundError();
		return subscription;
	}

	async updateOne(subscriptionId: string, dto: UpdateSubscriptionRequest) {
		const subscription = await this.findOne(subscriptionId);

		Object.assign(subscription, {
			...dto,
			updatedAt: new Date(),
		});

		return await subscription.save();
	}

	async deleteOne(subscriptionId: string) {
		const subscription = await this.findOne(subscriptionId);
		await subscription.deleteOne();
	}

	async toggleActive(subscriptionId: string) {
		const subscription = await this.findOne(subscriptionId);
		subscription.active = !subscription.active;
		subscription.updatedAt = new Date();
		return await subscription.save();
	}
}
