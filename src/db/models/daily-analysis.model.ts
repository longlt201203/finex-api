import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { BudgetDocumentType } from "./budget.model";

export interface IDailyAnalysis {
	total: number;
	date: number;
	month: number;
	year: number;
	budget: BudgetDocumentType;
}

export type DailyAnalysisDocumentType = HydratedDocument<IDailyAnalysis>;

export type DailyAnalysisModelType = Model<
	IDailyAnalysis,
	{},
	{},
	{},
	DailyAnalysisDocumentType
>;

const DailyAnalysisSchema = new Schema<IDailyAnalysis, DailyAnalysisModelType>({
	total: { type: Number, required: true },
	date: { type: Number, required: true },
	month: { type: Number, required: true },
	year: { type: Number, required: true },
	budget: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Budget",
	},
});

export const DailyAnalysisModel = mongoose.model<
	IDailyAnalysis,
	DailyAnalysisModelType
>("DailyAnalysis", DailyAnalysisSchema);
