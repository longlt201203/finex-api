import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { AccountDocumentType } from "./account.model";

export interface IBoard {
	title: string;
	timezone: string;
	currencyUnit: string;
	language: string;
	createdAt: Date;
	updatedAt: Date;
	isAnalyzed: boolean;
	isDeleted: boolean;
	account: AccountDocumentType;
}

export type BoardDocumentType = HydratedDocument<IBoard>;

export type BoardModelType = Model<IBoard, {}, {}, {}, BoardDocumentType>;

const BoardSchema = new Schema<IBoard, BoardModelType>({
	title: { type: String, required: true },
	timezone: { type: String, required: true },
	currencyUnit: { type: String, required: true },
	language: { type: String, required: true },
	createdAt: { type: Date, default: () => new Date() },
	updatedAt: { type: Date, default: () => new Date() },
	isAnalyzed: { type: Boolean, default: false },
	isDeleted: { type: Boolean, default: false },
	account: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Account",
	},
});

export const BoardModel = mongoose.model<IBoard, BoardModelType>(
	"Board",
	BoardSchema,
);
