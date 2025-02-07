import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { BoardDocumentType } from "./board.model";

export interface IMonthlyAnalysis {
	total: number;
	avg: number;
	variant: number;
	median: number;
	month: number;
	year: number;
	board: BoardDocumentType;
}

export type MonthlyAnalysisDocumentType = HydratedDocument<IMonthlyAnalysis>;

export type MonthlyAnalysisModelType = Model<
	IMonthlyAnalysis,
	{},
	{},
	{},
	MonthlyAnalysisDocumentType
>;

const MonthlyAnalysisSchema = new Schema<
	IMonthlyAnalysis,
	MonthlyAnalysisModelType
>({
	total: { type: Number, required: true },
	avg: { type: Number, required: true },
	variant: { type: Number, required: true },
	median: { type: Number, required: true },
	month: { type: Number, required: true },
	year: { type: Number, required: true },
	board: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Board",
	},
});

export const MonthlyAnalysisModel = mongoose.model<
	IMonthlyAnalysis,
	MonthlyAnalysisModelType
>("MonthlyAnalysis", MonthlyAnalysisSchema);
