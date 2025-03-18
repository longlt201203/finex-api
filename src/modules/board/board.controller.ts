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
import { BoardService } from "./board.service";
import {
	AiCreateBoardRequest,
	CreateBoardRequest,
	UpdateBoardRequest,
	BoardQuery,
	BoardResponse,
} from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("board")
@ApiBearerAuth()
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Post()
	@SwaggerApiResponse(Object)
	async createOne(@Body() dto: CreateBoardRequest) {
		await this.boardService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Post("ai-create")
	@SwaggerApiResponse(Object)
	async aiCreateBoard(@Body() dto: AiCreateBoardRequest) {
		const result = await this.boardService.aiCreateBoard(dto);
		return new ApiResponseDto(
			result,
			null,
			"Board created successfully with AI assistance",
		);
	}

	@Put(":boardId")
	@SwaggerApiResponse(Object)
	async updateOne(
		@Param("boardId") boardId: string,
		@Body() dto: UpdateBoardRequest,
	) {
		await this.boardService.updateOne(boardId, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	@SwaggerApiResponse(BoardResponse, { isArray: true })
	async findMany(@Query() query: BoardQuery) {
		const data = await this.boardService.findMany(query);
		return new ApiResponseDto(BoardResponse.fromDocuments(data));
	}

	@Get(":boardId")
	@SwaggerApiResponse(BoardResponse)
	async findOne(@Param("boardId") boardId: string) {
		const data = await this.boardService.findOne(boardId);
		return new ApiResponseDto(data);
	}

	@Delete(":boardId")
	@SwaggerApiResponse(Object)
	async deleteOne(@Param("boardId") boardId: string) {
		await this.boardService.deleteOne(boardId);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
