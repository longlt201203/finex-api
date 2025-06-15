import {
	Controller,
	Param,
	Body,
	Query,
	Get,
	Put,
	Patch,
} from "@nestjs/common";
import { AdminUserSubscriptionService } from "./admin-user-subscription.service";
import { RequireAdmin } from "@modules/auth";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import {
	AdminUserSubscriptionQuery,
	SubscriptionStatisticsResponse,
	RenewSubscriptionRequest,
} from "./dto";
import {
	UpdateUserSubscriptionRequest,
	UserSubscriptionResponse,
} from "@modules/user-subscription/dto";

@Controller("admin/user-subscription")
@ApiTags("Admin - User Subscriptions")
@ApiBearerAuth()
@RequireAdmin()
export class AdminUserSubscriptionController {
	constructor(
		private readonly adminUserSubscriptionService: AdminUserSubscriptionService,
	) {}

	@Get()
	@SwaggerApiResponse(UserSubscriptionResponse, { isArray: true })
	async findAll(@Query() query: AdminUserSubscriptionQuery) {
		const data = await this.adminUserSubscriptionService.findAll(query);
		return new ApiResponseDto(
			UserSubscriptionResponse.fromDocuments(data, true),
			null,
			"Success!",
		);
	}

	@Get("statistics")
	@SwaggerApiResponse(SubscriptionStatisticsResponse)
	async getStatistics() {
		const data = await this.adminUserSubscriptionService.getStatistics();
		return new ApiResponseDto(
			SubscriptionStatisticsResponse.fromData(data),
			null,
			"Statistics retrieved successfully",
		);
	}

	@Get(":userSubscriptionId")
	@ApiParam({ name: "userSubscriptionId" })
	@SwaggerApiResponse(UserSubscriptionResponse)
	async findOne(@Param("userSubscriptionId") userSubscriptionId: string) {
		const data =
			await this.adminUserSubscriptionService.findOne(userSubscriptionId);
		return new ApiResponseDto(
			UserSubscriptionResponse.fromDocument(data, true),
			null,
			"Success!",
		);
	}

	@Put(":userSubscriptionId")
	@ApiParam({ name: "userSubscriptionId" })
	@SwaggerApiResponse(UserSubscriptionResponse)
	async updateOne(
		@Param("userSubscriptionId") userSubscriptionId: string,
		@Body() dto: UpdateUserSubscriptionRequest,
	) {
		const data = await this.adminUserSubscriptionService.updateOne(
			userSubscriptionId,
			dto,
		);
		return new ApiResponseDto(
			UserSubscriptionResponse.fromDocument(data, true),
			null,
			"Updated successfully",
		);
	}

	@Patch(":userSubscriptionId/cancel")
	@ApiParam({ name: "userSubscriptionId" })
	@SwaggerApiResponse(UserSubscriptionResponse)
	async cancelSubscription(
		@Param("userSubscriptionId") userSubscriptionId: string,
	) {
		const data =
			await this.adminUserSubscriptionService.cancelSubscription(
				userSubscriptionId,
			);
		return new ApiResponseDto(
			UserSubscriptionResponse.fromDocument(data, true),
			null,
			"Subscription cancelled successfully",
		);
	}

	@Patch(":userSubscriptionId/renew")
	@ApiParam({ name: "userSubscriptionId" })
	@SwaggerApiResponse(UserSubscriptionResponse)
	async renewSubscription(
		@Param("userSubscriptionId") userSubscriptionId: string,
		@Body() dto: RenewSubscriptionRequest,
	) {
		const data = await this.adminUserSubscriptionService.renewSubscription(
			userSubscriptionId,
			dto.monthsToAdd,
		);
		return new ApiResponseDto(
			UserSubscriptionResponse.fromDocument(data, true),
			null,
			"Subscription renewed successfully",
		);
	}
}
