import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export enum AdsIncomeStatusEnum {
	PAID = "paid",
	PENDING = "pending",
	FAILED = "failed",
}

export interface IAdsIncome {
	source: string;
	amount: number;
	currency: string;
	date: Date;
	status?: AdsIncomeStatusEnum;
	createdAt: Date;
	updatedAt: Date;
}

export type AdsIncomeDocumentType = HydratedDocument<IAdsIncome>;
export type AdsIncomeModelType = Model<IAdsIncome>;

const AdsIncomeSchema = new Schema<IAdsIncome, AdsIncomeModelType>(
	{
		source: { type: String, required: true },
		amount: { type: Number, required: true },
		currency: { type: String, required: true },
		date: { type: Date, required: true },
		status: {
			type: String,
			enum: Object.values(AdsIncomeStatusEnum),
			required: false,
		},
	},
	{ timestamps: true },
);

export const AdsIncomeModel = mongoose.model<IAdsIncome, AdsIncomeModelType>(
	"AdsIncome",
	AdsIncomeSchema,
);
