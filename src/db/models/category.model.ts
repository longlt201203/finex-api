import mongoose, { HydratedDocument, Model } from "mongoose";

export interface ICategory {
	name: string;
	language: string;
	color: string;
	accountID: (typeof mongoose.Types.ObjectId)[];
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
	color: { type: String, required: true },
	accountID: [
		{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Account" },
	],
});

export const CategoryModel = mongoose.model<ICategory, CategoryDocumentType>(
	"Category",
	CategorySchema,
);
