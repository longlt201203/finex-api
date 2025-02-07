import mongoose, { HydratedDocument, Model } from "mongoose";
import { BoardDocumentType } from "./board.model";
import { RecordDocumentType } from "./record.model";
import { CategoryDocumentType } from "./category.model";

export interface IExtractedRecord {
	amount: number;
	content: string;
	notes: string;
	date: number;
	month: number;
	year: number;
	createdAt: Date;
	board: BoardDocumentType;
	record: RecordDocumentType;
	categories: CategoryDocumentType[];
}

export type ExtractedRecordDocumentType = HydratedDocument<IExtractedRecord>;

export type ExtractedRecordModelType = Model<
	IExtractedRecord,
	{},
	{},
	{},
	ExtractedRecordDocumentType
>;

const ExtractedRecordSchema = new mongoose.Schema<
	IExtractedRecord,
	ExtractedRecordModelType
>({
	amount: { type: Number, required: true },
	content: { type: String, required: true },
	notes: { type: String, required: true, default: "" },
	date: { type: Number, required: true },
	month: { type: Number, required: true },
	year: { type: Number, required: true },
	createdAt: { type: Date, default: () => new Date() },
	board: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Board",
	},
	record: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Record",
	},
	categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

export const ExtractedRecordModel = mongoose.model<
	IExtractedRecord,
	ExtractedRecordModelType
>("ExtractedRecord", ExtractedRecordSchema);
