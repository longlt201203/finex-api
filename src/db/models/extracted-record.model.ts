import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { BoardDocumentType } from "./board.model";
import { CategoryDocumentType } from "./category.model";
import { RecordDocumentType } from "./record.model";

export interface IExtractedRecord {
	record: RecordDocumentType;
	board: BoardDocumentType;
	categories: CategoryDocumentType[];
	amount: number;
	description: string;
	notes: string;
	createdAt: Date;
}

export type ExtractedRecordDocumentType = HydratedDocument<IExtractedRecord>;

export type ExtractedRecordModelType = Model<
	IExtractedRecord,
	{},
	{},
	{},
	ExtractedRecordDocumentType
>;

const ExtractedRecordSchema = new Schema<
	IExtractedRecord,
	ExtractedRecordModelType
>({
	amount: { type: Number, required: true },
	description: { type: String, required: true },
	notes: { type: String, required: true },
	createdAt: { type: Date, default: () => new Date() },
	record: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Record",
	},
	board: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Board",
	},
	categories: [
		{
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Category",
		},
	],
});

export const ExtractedRecordModel = mongoose.model<
	IExtractedRecord,
	ExtractedRecordModelType
>("ExtractedRecord", ExtractedRecordSchema);
