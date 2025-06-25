import { Injectable } from "@nestjs/common";
import { UserSubscriptionModel } from "@db/models";
import { UpdateUserSubscriptionRequest } from "@modules/user-subscription/dto";
import { UserSubscriptionNotFoundError } from "@modules/user-subscription/errors";
import { AdminUserSubscriptionQuery } from "./dto";
import * as dayjs from "dayjs";

@Injectable()
export class AdminUserSubscriptionService {
	// Find all user subscriptions with optional filtering
	async findAll(query: AdminUserSubscriptionQuery = {}) {
		const filter: any = {};

		if (query.active !== undefined) {
			filter.active = query.active;
		}

		if (query.subscriptionId) {
			filter.subscription = query.subscriptionId;
		}

		if (query.accountId) {
			filter.account = query.accountId;
		}

		if (query.paymentStatus) {
			filter.paymentStatus = query.paymentStatus;
		}

		return await UserSubscriptionModel.find(filter)
			.populate("subscription")
			.populate("account", "email fname lname")
			.sort({ createdAt: -1 });
	}

	// Find a specific user subscription by ID
	async findOne(userSubscriptionId: string) {
		const userSubscription = await UserSubscriptionModel.findById(
			userSubscriptionId,
		)
			.populate("subscription")
			.populate("account", "email fname lname");

		if (!userSubscription) throw new UserSubscriptionNotFoundError();
		return userSubscription;
	}

	// Update a user subscription
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

	// Cancel a user subscription
	async cancelSubscription(userSubscriptionId: string) {
		const userSubscription = await this.findOne(userSubscriptionId);

		userSubscription.active = false;
		userSubscription.updatedAt = new Date();

		return await userSubscription.save();
	}

	// Renew a user subscription
	async renewSubscription(userSubscriptionId: string, monthsToAdd: number = 1) {
		const userSubscription = await this.findOne(userSubscriptionId);

		// Extend expiry date by specified months from current expiry
		const newExpiryDate = dayjs(userSubscription.expiryDate)
			.add(monthsToAdd, "month")
			.toDate();

		userSubscription.expiryDate = newExpiryDate;
		userSubscription.active = true;
		userSubscription.updatedAt = new Date();

		return await userSubscription.save();
	}

	// Get subscription statistics
	async getStatistics() {
		const totalSubscriptions = await UserSubscriptionModel.countDocuments();
		const activeSubscriptions = await UserSubscriptionModel.countDocuments({
			active: true,
		});
		const expiredSubscriptions = await UserSubscriptionModel.countDocuments({
			active: true,
			expiryDate: { $lt: new Date() },
		});

		// Get subscriptions expiring in the next 30 days
		const thirtyDaysFromNow = dayjs().add(30, "days").toDate();
		const expiringSubscriptions = await UserSubscriptionModel.countDocuments({
			active: true,
			expiryDate: {
				$gte: new Date(),
				$lte: thirtyDaysFromNow,
			},
		});

		return {
			totalSubscriptions,
			activeSubscriptions,
			expiredSubscriptions,
			expiringSubscriptions,
		};
	}
}
