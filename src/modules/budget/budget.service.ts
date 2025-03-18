import { Injectable } from "@nestjs/common";
import {
	AiCreateBudgetRequest,
	CreateBudgetRequest,
	UpdateBudgetRequest,
	BudgetQuery,
} from "./dto";
import { BudgetModel, CategoryModel } from "@db/models";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { BudgetNotFoundError } from "./errors";
import { AiServiceFactory } from "@modules/ai";
import { CreateBudgetOutput } from "@modules/ai/dto";

@Injectable()
export class BudgetService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	async createOne(dto: CreateBudgetRequest) {
		const document = new BudgetModel({
			...dto,
			account: this.cls.get("account.id"),
		});
		return await document.save();
	}

	async aiCreateBudget(
		dto: AiCreateBudgetRequest,
	): Promise<CreateBudgetOutput> {
		// Use AI service to generate budget suggestions
		const aiService = AiServiceFactory.getAiService("openai");
		const budgetSuggestion = await aiService.createBudget({
			prompt: dto.prompt,
			language: dto.language,
		});

		// Create the budget with AI-suggested values
		const budget = new BudgetModel({
			title: budgetSuggestion.title,
			currencyUnit: budgetSuggestion.currencyUnit,
			language: budgetSuggestion.language,
			account: this.cls.get("account.id"),
		});
		await budget.save();

		// Create suggested categories if any
		if (
			budgetSuggestion.initialCategories &&
			budgetSuggestion.initialCategories.length > 0
		) {
			const categories = budgetSuggestion.initialCategories.map(
				(category) =>
					new CategoryModel({
						name: category.name,
						description: category.description || "",
						language: budgetSuggestion.language,
					}),
			);

			await CategoryModel.insertMany(categories);
		}

		return budgetSuggestion;
	}

	async updateOne(id: string | number, dto: UpdateBudgetRequest) {}

	async findMany(query: BudgetQuery) {
		return await BudgetModel.find().sort({ createdAt: -1 });
	}

	async findOne(id: string) {
		const accountId = this.cls.get("account.id");
		const budget = await BudgetModel.findById(id).populate("account").exec();
		if (!budget || budget.account._id.toString() != accountId)
			throw new BudgetNotFoundError();
		return budget;
	}

	async deleteOne(id: string | number) {}
}
