import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AnalysisService } from "./analysis.service";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import {
	AnalysisQuery,
	DailyAnalysisResponse,
	ExtractedRecordResponse,
	MonthlyAnalysisResponse,
	YearlyAnalysisResponse,
} from "./dto";
import { BoardGuard } from "@modules/board";

@Controller("board/:boardId/analysis")
@ApiBearerAuth()
@ApiParam({ name: "boardId" })
@UseGuards(BoardGuard)
export class AnalysisController {
	constructor(private readonly analysisService: AnalysisService) {}

	@Get("extracted-record")
	@SwaggerApiResponse(ExtractedRecordResponse, { isArray: true })
	async getExtractedRecord(@Query() query: AnalysisQuery) {
		const data = await this.analysisService.getExtractedRecords(query);
		return new ApiResponseDto(
			ExtractedRecordResponse.fromDocuments(data),
			null,
			"Success!",
		);
	}

	@Get("daily")
	@SwaggerApiResponse(DailyAnalysisResponse)
	async getDailyAnalysis(@Query() query: AnalysisQuery) {
		const data = await this.analysisService.getDailyAnalysis(query);
		return new ApiResponseDto(
			DailyAnalysisResponse.fromDocument(data),
			null,
			"Success!",
		);
	}

	@Get("monthly")
	@SwaggerApiResponse(MonthlyAnalysisResponse)
	async getMonthlyAnalysis(@Query() query: AnalysisQuery) {
		const { monthlyAnalysis, dailyAnalysis } =
			await this.analysisService.getMonthlyAnalysis(query);
		return new ApiResponseDto(
			MonthlyAnalysisResponse.formDocument(monthlyAnalysis, dailyAnalysis),
			null,
			"Success!",
		);
	}

	@Get("yearly")
	@SwaggerApiResponse(YearlyAnalysisResponse)
	async getYearlyAnalysis(@Query() query: AnalysisQuery) {}
}
