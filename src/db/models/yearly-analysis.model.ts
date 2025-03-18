import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { BudgetDocumentType } from "./budget.model";

export interface IYearlyAnalysis {
	total: number;
	avg: number;
	variant: number;
	median: number;
	year: number;
	budget: BudgetDocumentType;
}

export type YearlyAnalysisDocumentType = HydratedDocument<IYearlyAnalysis>;

export type YearlyAnalysisModelType = Model<
	IYearlyAnalysis,
	{},
	{},
	{},
	YearlyAnalysisDocumentType
>;

const YearlyAnalysisSchema = new Schema<
	IYearlyAnalysis,
	YearlyAnalysisModelType
>({
	total: { type: Number, required: true },
	avg: { type: Number, required: true },
	variant: { type: Number, required: true },
	median: { type: Number, required: true },
	year: { type: Number, required: true },
	budget: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Budget",
	},
});

export const YearlyAnalysisModel = mongoose.model<
	IYearlyAnalysis,
	YearlyAnalysisModelType
>("YearlyAnalysis", YearlyAnalysisSchema);
