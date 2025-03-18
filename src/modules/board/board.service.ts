import { Injectable } from "@nestjs/common";
import {
	AiCreateBoardRequest,
	CreateBoardRequest,
	UpdateBoardRequest,
	BoardQuery,
} from "./dto";
import { BoardModel, CategoryModel } from "@db/models";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { BoardNotFoundError } from "./errors";
import { AiServiceFactory } from "@modules/ai";
import { CreateBoardOutput } from "@modules/ai/dto";

@Injectable()
export class BoardService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	async createOne(dto: CreateBoardRequest) {
		const document = new BoardModel({
			...dto,
			account: this.cls.get("account.id"),
		});
		return await document.save();
	}

	async aiCreateBoard(dto: AiCreateBoardRequest): Promise<CreateBoardOutput> {
		// Use AI service to generate board suggestions
		const aiService = AiServiceFactory.getAiService("openai");
		const boardSuggestion = await aiService.createBoard({
			prompt: dto.prompt,
			language: dto.language,
		});

		// Create the board with AI-suggested values
		const board = new BoardModel({
			title: boardSuggestion.title,
			currencyUnit: boardSuggestion.currencyUnit,
			language: boardSuggestion.language,
			account: this.cls.get("account.id"),
		});
		await board.save();

		// Create suggested categories if any
		if (
			boardSuggestion.initialCategories &&
			boardSuggestion.initialCategories.length > 0
		) {
			const categories = boardSuggestion.initialCategories.map(
				(category) =>
					new CategoryModel({
						name: category.name,
						description: category.description || "",
						language: boardSuggestion.language,
					}),
			);

			await CategoryModel.insertMany(categories);
		}

		return boardSuggestion;
	}

	async updateOne(id: string | number, dto: UpdateBoardRequest) {}

	async findMany(query: BoardQuery) {
		return await BoardModel.find().sort({ createdAt: -1 });
	}

	async findOne(id: string) {
		const accountId = this.cls.get("account.id");
		const board = await BoardModel.findById(id).populate("account").exec();
		if (!board || board.account._id.toString() != accountId)
			throw new BoardNotFoundError();
		return board;
	}

	async deleteOne(id: string | number) {}
}
