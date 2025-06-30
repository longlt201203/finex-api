import { Controller, Get, Query } from "@nestjs/common";
import { ChartService } from "./chart.service";
import { GetCacQuery, GetFreeToPremiumQuery, GetWauQuery } from "./dto";
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
	async getRetentionRate() {}
}
