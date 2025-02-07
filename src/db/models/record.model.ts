import mongoose, { HydratedDocument, Model } from "mongoose";

export interface IRecord {
	content: string;
	createdAt: Date;
	boardID: typeof mongoose.Types.ObjectId;
}

export type RecordDocumentType = HydratedDocument<IRecord>;

export type RecordModelType = Model<IRecord, {}, {}, {}, RecordDocumentType>;

const RecordSchema = new mongoose.Schema<IRecord>({
	content: { type: String, required: true },
	createdAt: { type: Date, default: () => new Date() },
	boardID: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Board",
	},
});

export const RecordModel = mongoose.model<IRecord, RecordDocumentType>(
	"Record",
	RecordSchema,
);
