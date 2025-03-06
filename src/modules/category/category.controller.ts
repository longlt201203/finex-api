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
import { CategoryService } from "./category.service";
import {
	CreateCategoryRequest,
	UpdateCategoryRequest,
	CategoryQuery,
	CategoryResponse,
} from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("category")
@ApiBearerAuth()
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@SwaggerApiResponse(Object)
	async createOne(@Body() dto: CreateCategoryRequest) {
		await this.categoryService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Put(":categoryId")
	@SwaggerApiResponse(Object)
	async updateOne(
		@Param("categoryId") categoryId: string,
		@Body() dto: UpdateCategoryRequest,
	) {
		await this.categoryService.updateOne(categoryId, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	@SwaggerApiResponse(CategoryResponse, { isArray: true })
	async findMany(@Query() query: CategoryQuery) {
		const data = await this.categoryService.findMany(query);
		return new ApiResponseDto(
			CategoryResponse.fromDocuments(data),
			null,
			"Success!",
		);
	}

	@Get(":categoryId")
	@SwaggerApiResponse(CategoryResponse)
	async findOne(@Param("categoryId") categoryId: string) {
		const data = await this.categoryService.findOne(categoryId);
		return new ApiResponseDto(data);
	}

	@Delete(":categoryId")
	@SwaggerApiResponse(Object)
	async deleteOne(@Param("categoryId") categoryId: string) {
		await this.categoryService.deleteOne(categoryId);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
