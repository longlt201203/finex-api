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
import { SubscriptionService } from "./subscription.service";
import {
	CreateSubscriptionRequest,
	UpdateSubscriptionRequest,
	SubscriptionQuery,
	SubscriptionResponse,
} from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";

@Controller("subscription")
@ApiBearerAuth()
export class SubscriptionController {
	constructor(private readonly subscriptionService: SubscriptionService) {}

	@Post()
	@SwaggerApiResponse(Object)
	async createOne(@Body() dto: CreateSubscriptionRequest) {
		await this.subscriptionService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Get()
	@SwaggerApiResponse(SubscriptionResponse, { isArray: true })
	async findMany(@Query() query: SubscriptionQuery) {
		const data = await this.subscriptionService.findMany(query);
		return new ApiResponseDto(
			SubscriptionResponse.fromDocuments(data),
			null,
			"Success!",
		);
	}

	@Get(":subscriptionId")
	@ApiParam({ name: "subscriptionId" })
	@SwaggerApiResponse(SubscriptionResponse)
	async findOne(@Param("subscriptionId") subscriptionId: string) {
		const data = await this.subscriptionService.findOne(subscriptionId);
		return new ApiResponseDto(
			SubscriptionResponse.fromDocument(data),
			null,
			"Success!",
		);
	}

	@Put(":subscriptionId")
	@ApiParam({ name: "subscriptionId" })
	@SwaggerApiResponse(SubscriptionResponse)
	async updateOne(
		@Param("subscriptionId") subscriptionId: string,
		@Body() dto: UpdateSubscriptionRequest,
	) {
		const data = await this.subscriptionService.updateOne(subscriptionId, dto);
		return new ApiResponseDto(
			SubscriptionResponse.fromDocument(data),
			null,
			"Updated successfully",
		);
	}

	@Delete(":subscriptionId")
	@ApiParam({ name: "subscriptionId" })
	@SwaggerApiResponse(Object)
	async deleteOne(@Param("subscriptionId") subscriptionId: string) {
		await this.subscriptionService.deleteOne(subscriptionId);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}

	@Patch(":subscriptionId/toggle-active")
	@ApiParam({ name: "subscriptionId" })
	@SwaggerApiResponse(SubscriptionResponse)
	async toggleActive(@Param("subscriptionId") subscriptionId: string) {
		const data = await this.subscriptionService.toggleActive(subscriptionId);
		return new ApiResponseDto(
			SubscriptionResponse.fromDocument(data),
			null,
			"Subscription status toggled successfully",
		);
	}
}
