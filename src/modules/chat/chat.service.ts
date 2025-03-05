import { Injectable } from "@nestjs/common";
import { CreateChatRequest, UpdateChatRequest, ChatQuery } from "./dto";
import { AiServiceFactory } from "@modules/ai";

@Injectable()
export class ChatService {
	constructor() {}

	async createOne(dto: CreateChatRequest) {
		const ai = AiServiceFactory.getAiService("openai");
		return ai.chat({ message: dto.message });
	}

	async updateOne(id: string | number, dto: UpdateChatRequest) {}

	async findMany(query: ChatQuery) {}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}
