import {
	Controller,
	Param,
	Body,
	Query,
	Post,
	Get,
	Put,
	Delete,
	UseGuards,
} from "@nestjs/common";
import { RecordService } from "./record.service";
import {
	CreateRecordRequest,
	UpdateRecordRequest,
	RecordQuery,
	RecordResponse,
} from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { BudgetGuard } from "@modules/budget";

@Controller("budget/:budgetId/record")
@ApiBearerAuth()
@ApiParam({ name: "budgetId" })
@UseGuards(BudgetGuard)
export class RecordController {
	constructor(private readonly recordService: RecordService) {}

	@Post()
	@SwaggerApiResponse(Object)
	async createOne(@Body() dto: CreateRecordRequest) {
		await this.recordService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Put(":recordId")
	@SwaggerApiResponse(Object)
	async updateOne(
		@Param("recordId") recordId: string,
		@Body() dto: UpdateRecordRequest,
	) {
		await this.recordService.updateOne(recordId, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	@SwaggerApiResponse(RecordResponse, { isArray: true })
	async findMany(@Query() query: RecordQuery) {
		const data = await this.recordService.findMany(query);
		return new ApiResponseDto(
			RecordResponse.fromDocuments(data),
			null,
			"Success!",
		);
	}

	@Get(":recordId")
	@SwaggerApiResponse(RecordResponse)
	async findOne(@Param("recordId") recordId: string) {
		const data = await this.recordService.findOne(recordId);
		return new ApiResponseDto(
			RecordResponse.fromDocument(data),
			null,
			"Success!",
		);
	}

	@Delete(":recordId")
	@SwaggerApiResponse(Object)
	async deleteOne(@Param("recordId") recordId: string) {
		await this.recordService.deleteOne(recordId);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
