import { Injectable } from "@nestjs/common";
import {
	CreateUserSubscriptionRequest,
	UpdateUserSubscriptionRequest,
	UserSubscriptionQuery,
} from "./dto";
import { SubscriptionModel, UserSubscriptionModel } from "@db/models";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import {
	UserSubscriptionNotFoundError,
	SubscriptionNotAvailableError,
} from "./errors";
import * as dayjs from "dayjs";

@Injectable()
export class UserSubscriptionService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	async createOne(dto: CreateUserSubscriptionRequest) {
		const accountId = this.cls.get("account.id");

		// Check if subscription exists and is active
		const subscription = await SubscriptionModel.findOne({
			_id: dto.subscriptionId,
			active: true,
		});

		if (!subscription) {
			throw new SubscriptionNotAvailableError();
		}

		// Calculate expiry date if not provided
		let expiryDate = dto.expiryDate;
		if (!expiryDate) {
			// Default to 1 month from now
			expiryDate = dayjs().add(1, "month").toDate();
		}

		// Create user subscription
		const document = new UserSubscriptionModel({
			account: accountId,
			subscription: dto.subscriptionId,
			expiryDate,
			purchaseDate: new Date(),
			active: true,
		});

		return await document.save();
	}

	async findMany(query: UserSubscriptionQuery) {
		const accountId = this.cls.get("account.id");
		const filter: any = { account: accountId };

		if (query.active !== undefined) {
			filter.active = query.active;
		}

		if (query.subscriptionId) {
			filter.subscription = query.subscriptionId;
		}

		if (query.paymentStatus) {
			filter.paymentStatus = query.paymentStatus;
		}

		return await UserSubscriptionModel.find(filter)
			.populate("subscription")
			.sort({ createdAt: -1 });
	}

	async findOne(userSubscriptionId: string) {
		const accountId = this.cls.get("account.id");
		const userSubscription = await UserSubscriptionModel.findOne({
			_id: userSubscriptionId,
			account: accountId,
		}).populate("subscription");

		if (!userSubscription) throw new UserSubscriptionNotFoundError();
		return userSubscription;
	}

	async updateOne(
		userSubscriptionId: string,
		dto: UpdateUserSubscriptionRequest,
	) {
		const userSubscription = await this.findOne(userSubscriptionId);

		Object.assign(userSubscription, {
			...dto,
			updatedAt: new Date(),
		});

		return await userSubscription.save();
	}

	async cancelSubscription(userSubscriptionId: string) {
		const userSubscription = await this.findOne(userSubscriptionId);

		userSubscription.active = false;
		userSubscription.updatedAt = new Date();

		return await userSubscription.save();
	}

	async renewSubscription(userSubscriptionId: string) {
		const userSubscription = await this.findOne(userSubscriptionId);

		// Check if the subscription is still active in the system
		const subscription = await SubscriptionModel.findOne({
			_id: userSubscription.subscription,
			active: true,
		});

		if (!subscription) {
			throw new SubscriptionNotAvailableError();
		}

		// Extend expiry date by 1 month from current expiry
		const newExpiryDate = dayjs(userSubscription.expiryDate)
			.add(1, "month")
			.toDate();

		userSubscription.expiryDate = newExpiryDate;
		userSubscription.active = true;
		userSubscription.updatedAt = new Date();

		return await userSubscription.save();
	}
}
