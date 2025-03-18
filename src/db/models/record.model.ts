import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { BudgetDocumentType } from "./budget.model";

export interface IRecord {
	content: string;
	createdAt: Date;
	budget: BudgetDocumentType;
}

const RecordSchema = new Schema<IRecord>(
	{
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
	},
	{
		timestamps: true,
	},
);

export type RecordDocumentType = HydratedDocument<IRecord>;
export type RecordModelType = Model<IRecord>;

export const RecordModel = mongoose.model<IRecord, RecordModelType>(
	"Record",
	RecordSchema,
);
