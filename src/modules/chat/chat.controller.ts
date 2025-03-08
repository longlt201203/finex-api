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
import { ChatService } from "./chat.service";
import {
	CreateChatRequest,
	UpdateChatRequest,
	ChatQuery,
	ChatResponse,
} from "./dto";
import { ApiResponseDto } from "@utils";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("chat")
@ApiBearerAuth()
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post()
	async createOne(@Body() dto: CreateChatRequest) {
		const data = await this.chatService.createOne(dto);
		return new ApiResponseDto(data, null, "Created successfully");
	}

	@Put(":id")
	async updateOne(@Param("id") id: string, @Body() dto: UpdateChatRequest) {
		await this.chatService.updateOne(id, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	async findMany(@Query() query: ChatQuery) {
		const data = await this.chatService.findMany(query);
		return new ApiResponseDto(ChatResponse.fromDocuments(data).reverse());
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const data = await this.chatService.findOne(id);
		return new ApiResponseDto(data);
	}

	@Delete(":id")
	async deleteOne(@Param("id") id: string) {
		await this.chatService.deleteOne(id);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
