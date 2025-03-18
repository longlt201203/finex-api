import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { AccountDocumentType } from "./account.model";

export interface IBudget {
	title: string;
	currencyUnit: string;
	language: string;
	createdAt: Date;
	updatedAt: Date;
	isAnalyzed: boolean;
	isDeleted: boolean;
	account: AccountDocumentType;
}

export type BudgetDocumentType = HydratedDocument<IBudget>;

export type BudgetModelType = Model<IBudget, {}, {}, {}, BudgetDocumentType>;

const BudgetSchema = new Schema<IBudget, BudgetModelType>({
	title: { type: String, required: true },
	currencyUnit: { type: String, required: true },
	language: { type: String, required: true },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
	isAnalyzed: { type: Boolean, default: false },
	isDeleted: { type: Boolean, default: false },
	account: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Account",
	},
});

export const BudgetModel = mongoose.model<IBudget, BudgetModelType>(
	"Budget",
	BudgetSchema,
);
