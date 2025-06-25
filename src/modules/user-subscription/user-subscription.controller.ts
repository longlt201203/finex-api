import {
	Controller,
	Param,
	Body,
	Query,
	Post,
	Get,
	Put,
	Delete,
	Patch,
} from "@nestjs/common";
import { UserSubscriptionService } from "./user-subscription.service";
import {
	CreateUserSubscriptionRequest,
	UpdateUserSubscriptionRequest,
	UserSubscriptionQuery,
	UserSubscriptionResponse,
} from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";

@Controller("user-subscription")
@ApiBearerAuth()
@ApiTags("User Subscriptions")
export class UserSubscriptionController {
	constructor(
		private readonly userSubscriptionService: UserSubscriptionService,
	) {}

	@Post()
	@SwaggerApiResponse(UserSubscriptionResponse)
	async createOne(@Body() dto: CreateUserSubscriptionRequest) {
		const data = await this.userSubscriptionService.createOne(dto);
		return new ApiResponseDto(
			UserSubscriptionResponse.fromDocument(data, true),
			null,
			"Subscription purchased successfully",
		);
	}

	@Get()
	@SwaggerApiResponse(UserSubscriptionResponse, { isArray: true })
	async findMany(@Query() query: UserSubscriptionQuery) {
		const data = await this.userSubscriptionService.findMany(query);
		return new ApiResponseDto(
			UserSubscriptionResponse.fromDocuments(data, true),
			null,
			"Success!",
		);
	}

	@Get(":userSubscriptionId")
	@ApiParam({ name: "userSubscriptionId" })
	@SwaggerApiResponse(UserSubscriptionResponse)
	async findOne(@Param("userSubscriptionId") userSubscriptionId: string) {
		const data = await this.userSubscriptionService.findOne(userSubscriptionId);
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
		const data = await this.userSubscriptionService.updateOne(
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
			await this.userSubscriptionService.cancelSubscription(userSubscriptionId);
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
	) {
		const data =
			await this.userSubscriptionService.renewSubscription(userSubscriptionId);
		return new ApiResponseDto(
			UserSubscriptionResponse.fromDocument(data, true),
			null,
			"Subscription renewed successfully",
		);
	}
}
