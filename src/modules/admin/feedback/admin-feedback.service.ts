import { Injectable } from "@nestjs/common";
import { AdminFeedbackQuery } from "./dto/query";
import { FeedbackModel, FeedbackStatusEnum } from "@db/models";

@Injectable()
export class AdminFeedbackService {
	async findAll(query: AdminFeedbackQuery) {
		const filter: any = {};
		if (query.status) filter.status = this.humanToEnum(query.status);
		if (query.type) filter.type = new RegExp(`^${query.type}$`, "i");
		if (query.userId) filter.account = query.userId;
		return FeedbackModel.find(filter)
			.sort({ createdAt: -1 })
			.populate("account", "fname lname role")
			.populate("replies.account", "fname lname role");
	}

	async updateStatus(feedbackId: string, status: FeedbackStatusEnum | string) {
		const enumStatus =
			typeof status === "string" ? this.humanToEnum(status) : status;
		return FeedbackModel.findByIdAndUpdate(
			feedbackId,
			{ status: enumStatus },
			{ new: true },
		)
			.populate("account", "fname lname role")
			.populate("replies.account", "fname lname role");
	}

	humanToEnum(s: string): FeedbackStatusEnum {
		const map: Record<string, FeedbackStatusEnum> = {
			Open: FeedbackStatusEnum.NEW,
			"In Progress": FeedbackStatusEnum.REVIEWING,
			Resolved: FeedbackStatusEnum.RESOLVED,
			Closed: FeedbackStatusEnum.CLOSED,
		};
		return map[s] ?? (s as any);
	}
}
