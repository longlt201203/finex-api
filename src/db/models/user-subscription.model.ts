import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { AccountDocumentType } from "./account.model";
import { SubscriptionDocumentType } from "./subscription.model";

export interface IUserSubscription {
	account: AccountDocumentType;
	subscription: SubscriptionDocumentType;
	purchaseDate: Date;
	expiryDate: Date;
	active: boolean;
	paymentStatus: UserSubscriptionPaymentStatus;
	createdAt: Date;
	updatedAt: Date;
}

export enum UserSubscriptionPaymentStatus {
	PENDING = "pending",
	COMPLETED = "completed",
	CANCELLED = "cancelled",
	FAILED = "failed",
}

export type UserSubscriptionDocumentType = HydratedDocument<IUserSubscription>;

export type UserSubscriptionModelType = Model<
	IUserSubscription,
	{},
	{},
	{},
	UserSubscriptionDocumentType
>;

const UserSubscriptionSchema = new Schema<
	IUserSubscription,
	UserSubscriptionModelType
>({
	account: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Account",
	},
	subscription: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Subscription",
	},
	purchaseDate: { type: Date, default: () => new Date() },
	expiryDate: { type: Date, required: true },
	active: { type: Boolean, default: true },
	paymentStatus: {
		type: String,
		enum: Object.values(UserSubscriptionPaymentStatus),
		default: UserSubscriptionPaymentStatus.COMPLETED,
	},
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
});

export const UserSubscriptionModel = mongoose.model<
	IUserSubscription,
	UserSubscriptionModelType
>("UserSubscription", UserSubscriptionSchema);
