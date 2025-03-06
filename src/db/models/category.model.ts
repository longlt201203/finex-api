import mongoose, { HydratedDocument, Model } from "mongoose";
import { AccountDocumentType } from "./account.model";

export interface ICategory {
	name: string;
	language: string;
	color?: string;
	account?: AccountDocumentType;
}

export type CategoryDocumentType = HydratedDocument<ICategory>;

export type CategoryModelType = Model<
	ICategory,
	{},
	{},
	{},
	CategoryDocumentType
>;

const CategorySchema = new mongoose.Schema<ICategory>({
	name: { type: String, required: true },
	language: { type: String, required: true },
	color: { type: String },
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Account",
	},
});

export const CategoryModel = mongoose.model<ICategory, CategoryModelType>(
	"Category",
	CategorySchema,
);
