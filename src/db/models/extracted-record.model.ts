import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { BudgetDocumentType } from "./budget.model";
import { CategoryDocumentType } from "./category.model";

export interface IExtractedRecord {
	amount: number;
	content: string;
	createdAt: Date;
	budget: BudgetDocumentType;
	categories: CategoryDocumentType[];
}

const ExtractedRecordSchema = new Schema<IExtractedRecord>(
	{
		amount: {
			type: Number,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
		},
		budget: {
			type: Schema.Types.ObjectId,
			ref: "Budget",
			required: true,
		},
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: "Category",
			},
		],
	},
	{
		timestamps: true,
	},
);

export type ExtractedRecordDocumentType = HydratedDocument<IExtractedRecord>;
export type ExtractedRecordModelType = Model<IExtractedRecord>;

export const ExtractedRecordModel = mongoose.model<
	IExtractedRecord,
	ExtractedRecordModelType
>("ExtractedRecord", ExtractedRecordSchema);
