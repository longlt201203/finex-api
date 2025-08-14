import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export enum FeedbackStatusEnum {
	NEW = "new",
	REVIEWING = "reviewing",
	RESOLVED = "resolved",
	CLOSED = "closed",
}

export interface IFeedbackReply {
	content: string;
	account: Schema.Types.ObjectId;
	createdAt: Date;
}

export interface IFeedback {
	title: string;
	type: string;
	content: string;
	rating: number;
	status: FeedbackStatusEnum;
	replies: IFeedbackReply[];
	account: Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

export type FeedbackDocumentType = HydratedDocument<IFeedback>;
export type FeedbackModelType = Model<IFeedback>;

const FeedbackReplySchema = new Schema<IFeedbackReply>(
	{
		content: { type: String, required: true },
		account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
		createdAt: { type: Date, default: () => new Date() },
	},
	{ _id: true },
);

const FeedbackSchema = new Schema<IFeedback, FeedbackModelType>(
	{
		title: { type: String, required: true },
		type: { type: String, required: true },
		content: { type: String, required: true },
		rating: { type: Number, required: true, min: 1, max: 5 },
		status: {
			type: String,
			enum: Object.values(FeedbackStatusEnum),
			default: FeedbackStatusEnum.NEW,
		},
		replies: { type: [FeedbackReplySchema], default: [] },
		account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
	},
	{ timestamps: true },
);

export const FeedbackModel = mongoose.model<IFeedback, FeedbackModelType>(
	"Feedback",
	FeedbackSchema,
);
