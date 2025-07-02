import { Controller, Get, Query } from "@nestjs/common";
import { ChartService } from "./chart.service";
import {
	GetCacQuery,
	GetChurnRateQuery,
	GetFreeToPremiumQuery,
	GetMonthlyRecurringRevenueQuery,
	GetRetentionRateQuery,
	GetWauQuery,
} from "./dto";
import { ApiResponseDto } from "@utils";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("chart")
@ApiBearerAuth()
export class ChartController {
	constructor(private readonly chartService: ChartService) {}

	@Get("wau")
	async getWau(@Query() query: GetWauQuery) {
		const data = await this.chartService.getWau(query);
		return new ApiResponseDto(data);
	}

	@Get("cac")
	async getCac(@Query() query: GetCacQuery) {
		const data = await this.chartService.getCac(query);
		return new ApiResponseDto(data);
	}

	@Get("free-to-premium")
	async getFreeToPremium(@Query() query: GetFreeToPremiumQuery) {
		const data = await this.chartService.getFreeToPremium(query);
		return new ApiResponseDto(data);
	}

	@Get("retention-rate")
	async getRetentionRate(@Query() query: GetRetentionRateQuery) {
		const data = await this.chartService.getRetentionRate(query);
		return new ApiResponseDto(data);
	}

	@Get("monthly-recurring-revenue")
	async getMonthlyRecurringRevenue(
		@Query() query: GetMonthlyRecurringRevenueQuery,
	) {
		const data = await this.chartService.getMonthlyRecurringRevenue(query);
		return new ApiResponseDto(data);
	}

	@Get("churn-rate")
	async getChurnRate(@Query() query: GetChurnRateQuery) {
		const data = await this.chartService.getChurnRate(query);
		return new ApiResponseDto(data);
	}
}
