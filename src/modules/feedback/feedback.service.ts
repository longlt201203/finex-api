import { Injectable } from "@nestjs/common";
import { CreateFeedbackRequest } from "./dto";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { FeedbackModel } from "@db/models";
import { FeedbackQuery } from "./dto/query";
import { CreateReplyRequest } from "./dto/reply";

@Injectable()
export class FeedbackService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	async createOne(dto: CreateFeedbackRequest) {
		const accountId = this.cls.get("account.id");
		const feedback = new FeedbackModel({
			title: dto.title,
			type: dto.type,
			content: dto.content,
			rating: dto.rating,
			account: accountId,
		});
		await feedback.save();
		return feedback;
	}

	async list(query: FeedbackQuery) {
		const accountId = this.cls.get("account.id");
		const filter: any = {};
		if (query.mine === "true") filter.account = accountId;
		if (query.status) filter.status = new RegExp(`^${query.status}$`, "i");
		if (query.type) filter.type = new RegExp(`^${query.type}$`, "i");
		return FeedbackModel.find(filter)
			.sort({ createdAt: -1 })
			.populate("account", "fname lname role")
			.populate("replies.account", "fname lname role");
	}

	async reply(feedbackId: string, dto: CreateReplyRequest) {
		const accountId = this.cls.get("account.id");
		await FeedbackModel.findByIdAndUpdate(feedbackId, {
			$push: {
				replies: { content: dto.content, account: accountId },
			},
		});
		return FeedbackModel.findById(feedbackId)
			.populate("account", "fname lname role")
			.populate("replies.account", "fname lname role");
	}
}
