import {
	Controller,
	Param,
	Body,
	Query,
	Post,
	Get,
	Put,
	Delete,
} from "@nestjs/common";
import { BudgetService } from "./budget.service";
import {
	AiCreateBudgetRequest,
	CreateBudgetRequest,
	UpdateBudgetRequest,
	BudgetQuery,
	BudgetResponse,
} from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("budget")
@ApiBearerAuth()
export class BudgetController {
	constructor(private readonly budgetService: BudgetService) {}

	@Post()
	@SwaggerApiResponse(Object)
	async createOne(@Body() dto: CreateBudgetRequest) {
		await this.budgetService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Post("ai-create")
	@SwaggerApiResponse(Object)
	async aiCreateBudget(@Body() dto: AiCreateBudgetRequest) {
		const result = await this.budgetService.aiCreateBudget(dto);
		return new ApiResponseDto(
			result,
			null,
			"Budget created successfully with AI assistance",
		);
	}

	@Put(":budgetId")
	async updateOne(
		@Param("budgetId") budgetId: string,
		@Body() dto: UpdateBudgetRequest,
	) {
		const budget = await this.budgetService.updateOne(budgetId, dto);
		return {
			message: "Budget updated successfully",
			data: budget,
		};
	}

	@Delete(":budgetId")
	async deleteOne(@Param("budgetId") budgetId: string) {
		const result = await this.budgetService.deleteOne(budgetId);
		return {
			message: "Budget deleted successfully",
			data: result,
		};
	}

	@Get()
	@SwaggerApiResponse(BudgetResponse, { isArray: true })
	async findMany(@Query() query: BudgetQuery) {
		const data = await this.budgetService.findMany(query);
		return new ApiResponseDto(BudgetResponse.fromDocuments(data));
	}

	@Get(":budgetId")
	@SwaggerApiResponse(BudgetResponse)
	async findOne(@Param("budgetId") budgetId: string) {
		const data = await this.budgetService.findOne(budgetId);
		return new ApiResponseDto(data);
	}
}
