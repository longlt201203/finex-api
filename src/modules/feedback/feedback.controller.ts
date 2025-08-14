import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackRequest, FeedbackResponse } from "./dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { FeedbackQuery } from "./dto/query";
import { CreateReplyRequest } from "./dto/reply";

@Controller("feedback")
@ApiBearerAuth()
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@Get()
	@SwaggerApiResponse(FeedbackResponse, { isArray: true })
	async list(@Query() query: FeedbackQuery) {
		const data = await this.feedbackService.list(query);
		return new ApiResponseDto(FeedbackResponse.fromDocuments(data));
	}

	@Post()
	@SwaggerApiResponse(FeedbackResponse)
	async create(@Body() dto: CreateFeedbackRequest) {
		const created = await this.feedbackService.createOne(dto);
		const populated = await await (
			await created.populate("account", "fname lname role")
		).populate("replies.account", "fname lname role");
		return new ApiResponseDto(FeedbackResponse.fromDocument(populated));
	}

	@Post(":feedbackId/reply")
	@SwaggerApiResponse(FeedbackResponse)
	async reply(
		@Param("feedbackId") feedbackId: string,
		@Body() dto: CreateReplyRequest,
	) {
		const data = await this.feedbackService.reply(feedbackId, dto);
		return new ApiResponseDto(FeedbackResponse.fromDocument(data));
	}
}
