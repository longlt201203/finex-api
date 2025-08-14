import { Controller, Get, Query } from "@nestjs/common";
import { AdminAdsIncomeService } from "./admin-ads-income.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RequireAdmin } from "@modules/auth";
import { AdsIncomeQueryParams } from "./dto/query";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import {
	AdsIncomeRecordResponse,
	AdsIncomeSummaryResponse,
} from "./dto/response";

@Controller("admin/ads-income")
@ApiBearerAuth()
@RequireAdmin()
export class AdminAdsIncomeController {
	constructor(private readonly service: AdminAdsIncomeService) {}

	@Get()
	@SwaggerApiResponse(AdsIncomeRecordResponse, { isArray: true })
	async getAdsIncome(@Query() query: AdsIncomeQueryParams) {
		const data = await this.service.findAll(query);
		return new ApiResponseDto(AdsIncomeRecordResponse.fromDocuments(data));
	}

	@Get("summary")
	@SwaggerApiResponse(AdsIncomeSummaryResponse)
	async getSummary(@Query() query: AdsIncomeQueryParams) {
		const data = await this.service.summary(query);
		return new ApiResponseDto(data);
	}
}
