import mongoose, { HydratedDocument, Model } from "mongoose";
import { BoardDocumentType } from "./board.model";
import * as dayjs from "dayjs";

export interface IRecord {
	content: string;
	createdAt: string;
	date: number;
	month: number;
	year: number;
	board: BoardDocumentType;
}

export type RecordDocumentType = HydratedDocument<IRecord>;

export type RecordModelType = Model<IRecord, {}, {}, {}, RecordDocumentType>;

const RecordSchema = new mongoose.Schema<IRecord, RecordModelType>({
	content: { type: String, required: true },
	createdAt: {
		type: String,
		required: true,
		default: () => dayjs().format("DD/MM/YYYY HH:mm:ss"),
	},
	date: {
		type: Number,
		required: true,
	},
	month: {
		type: Number,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	board: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Board",
	},
});

export const RecordModel = mongoose.model<IRecord, RecordModelType>(
	"Record",
	RecordSchema,
);
