import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import { AccountDocumentType } from "./account.model";

export interface IChat {
	role: string;
	message: string;
	account: AccountDocumentType;
	createdAt: Date;
}

export type ChatDocumentType = HydratedDocument<IChat>;

export type ChatModelType = Model<IChat, {}, {}, {}, ChatDocumentType>;

const ChatSchema = new Schema({
	role: { type: String, required: true },
	message: { type: String, required: true },
	account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
	createdAt: { type: Date, default: () => new Date() },
});

export const ChatModel = mongoose.model<IChat, ChatModelType>(
	"Chat",
	ChatSchema,
);
