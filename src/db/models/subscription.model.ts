import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { AccountDocumentType } from "./account.model";

export interface ISubscription {
	name: string;
	price: number;
	currencyUnit: string;
	startDate: Date;
	endDate: Date;
	active: boolean;
	description?: string;
	account: AccountDocumentType;
	createdAt: Date;
	updatedAt: Date;
}

export type SubscriptionDocumentType = HydratedDocument<ISubscription>;

export type SubscriptionModelType = Model<
	ISubscription,
	{},
	{},
	{},
	SubscriptionDocumentType
>;

const SubscriptionSchema = new Schema<ISubscription, SubscriptionModelType>({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	currencyUnit: { type: String, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	active: { type: Boolean, default: true },
	description: { type: String, required: false },
	account: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Account",
	},
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
});

export const SubscriptionModel = mongoose.model<
	ISubscription,
	SubscriptionModelType
>("Subscription", SubscriptionSchema);
