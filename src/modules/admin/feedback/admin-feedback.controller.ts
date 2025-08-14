import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { AdminFeedbackService } from "./admin-feedback.service";
import { RequireAdmin } from "@modules/auth";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { FeedbackResponse } from "@modules/feedback/dto";
import { AdminFeedbackQuery } from "./dto/query";
import { UpdateFeedbackStatusRequest } from "./dto/update-status.request";

@Controller("admin/feedback")
@ApiTags("Admin - Feedback")
@ApiBearerAuth()
@RequireAdmin()
export class AdminFeedbackController {
	constructor(private readonly adminFeedbackService: AdminFeedbackService) {}

	@Get()
	@SwaggerApiResponse(FeedbackResponse, { isArray: true })
	async findAll(@Query() query: AdminFeedbackQuery) {
		const data = await this.adminFeedbackService.findAll(query);
		return new ApiResponseDto(FeedbackResponse.fromDocuments(data));
	}

	@Patch(":feedbackId/status")
	@ApiParam({ name: "feedbackId" })
	@SwaggerApiResponse(FeedbackResponse)
	async updateStatus(
		@Param("feedbackId") feedbackId: string,
		@Body() dto: UpdateFeedbackStatusRequest,
	) {
		const data = await this.adminFeedbackService.updateStatus(
			feedbackId,
			dto.status,
		);
		return new ApiResponseDto(FeedbackResponse.fromDocument(data));
	}
}
