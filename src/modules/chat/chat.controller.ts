import { Controller, Post, Body, Res, HttpStatus, Get } from "@nestjs/common";
import { Response } from "express";
import { ChatService } from "./chat.service";
import { CreateChatRequest } from "./dto";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ChatResponse } from "./dto/response";
import { ApiResponseDto } from "@utils";

@ApiTags("Chat")
@Controller("chat")
@ApiBearerAuth()
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	// Keep existing endpoints
	@Post()
	async createOne(@Body() dto: CreateChatRequest) {
		return await this.chatService.createOne(dto);
	}

	// Add new stream endpoint
	@Post("stream")
	@ApiOperation({ summary: "Stream chat response with SSE" })
	async streamChat(@Body() dto: CreateChatRequest, @Res() res: Response) {
		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");

		try {
			const chatStream$ = await this.chatService.createChatStream(dto);

			chatStream$.subscribe({
				next: (chunk) => {
					res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
				},
				error: (error) => {
					res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
					res.end();
				},
				complete: () => {
					res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
					res.end();
				},
			});
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				message: "An error occurred while processing your request",
				error: error.message,
			});
		}
	}

	// Add new endpoint to get chat history
	@Get()
	@ApiOperation({ summary: "Get recent chat history" })
	async getChatHistory() {
		const chatHistory = await this.chatService.findMany({});
		return new ApiResponseDto(
			ChatResponse.fromDocuments(chatHistory).reverse(),
		);
	}
}
