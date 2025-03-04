import mongoose, { HydratedDocument, Model } from "mongoose";
import { BoardDocumentType } from "./board.model";

export interface IRecord {
	content: string;
	createdAt: Date;
	board: BoardDocumentType;
}

export type RecordDocumentType = HydratedDocument<IRecord>;

export type RecordModelType = Model<IRecord, {}, {}, {}, RecordDocumentType>;

const RecordSchema = new mongoose.Schema<IRecord, RecordModelType>({
	content: { type: String, required: true },
	createdAt: {
		type: Date,
		required: true,
		default: () => new Date(),
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
