import { Controller, Get, Query } from "@nestjs/common";
import { AnalysisService } from "./analysis.service";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { SwaggerApiResponse } from "@utils";
import {
	AnalysisQuery,
	DailyAnalysisResponse,
	ExtractedRecordResponse,
	MonthlyAnalysisResponse,
	YearlyAnalysisResponse,
} from "./dto";

@Controller("board/:boardId/analysis")
@ApiBearerAuth()
@ApiParam({ name: "boardId" })
export class AnalysisController {
	constructor(private readonly analysisService: AnalysisService) {}

	@Get("extracted-record")
	@SwaggerApiResponse(ExtractedRecordResponse, { isArray: true })
	async getExtractedRecord(@Query() query: AnalysisQuery) {}

	@Get("daily")
	@SwaggerApiResponse(DailyAnalysisResponse)
	async getDailyAnalysis(@Query() query: AnalysisQuery) {}

	@Get("monthly")
	@SwaggerApiResponse(MonthlyAnalysisResponse)
	async getMonthlyAnalysis(@Query() query: AnalysisQuery) {}

	@Get("yearly")
	@SwaggerApiResponse(YearlyAnalysisResponse)
	async getYearlyAnalysis(@Query() query: AnalysisQuery) {}
}
