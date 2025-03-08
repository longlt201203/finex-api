import { Injectable } from "@nestjs/common";
import { CreateChatRequest, UpdateChatRequest, ChatQuery } from "./dto";
import { AiServiceFactory } from "@modules/ai";
import { ChatModel, MonthlyAnalysisModel } from "@db/models";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { ChatCompletionMessage } from "openai/resources";

@Injectable()
export class ChatService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	async createOne(dto: CreateChatRequest) {
		const accountId = this.cls.get("account.id");
		const comment = this.cls.get("account.comment");
		const chatList = await this.findMany({});
		chatList.push(
			new ChatModel({
				account: accountId,
				role: "user",
				message: dto.message,
				createdAt: new Date(),
			}),
		);

		const ai = AiServiceFactory.getAiService("openai");
		const content = await ai.chat({
			data: chatList
				.map(
					(item) =>
						({
							role: item.role,
							content: item.message,
						}) as ChatCompletionMessage,
				)
				.reverse(),
			comments: [comment],
		});

		chatList.push(
			new ChatModel({
				account: accountId,
				role: "assistant",
				message: content,
				createdAt: new Date(),
			}),
		);
		ChatModel.bulkSave(chatList);

		return content;
	}

	async updateOne(id: string | number, dto: UpdateChatRequest) {}

	async findMany(query: ChatQuery) {
		const accountId = this.cls.get("account.id");
		return await ChatModel.find(
			{ account: accountId },
			{},
			{
				limit: 10,
				sort: {
					createdAt: -1,
				},
			},
		);
	}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}
