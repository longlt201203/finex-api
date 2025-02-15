import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { BoardDocumentType } from "./board.model";

export interface IDailyAnalysis {
	total: number;
	date: number;
	month: number;
	year: number;
	board: BoardDocumentType;
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
	board: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Board",
	},
});

export const DailyAnalysisModel = mongoose.model<
	IDailyAnalysis,
	DailyAnalysisModelType
>("DailyAnalysis", DailyAnalysisSchema);
