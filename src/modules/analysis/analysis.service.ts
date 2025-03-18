import {
	AccountModel,
	BudgetDocumentType,
	BudgetModel,
	CategoryModel,
	DailyAnalysisModel,
	MonthlyAnalysisModel,
	RecordModel,
} from "@db/models";
import { ExtractedRecordModel } from "@db/models/extracted-record.model";
import { AiServiceFactory } from "@modules/ai";
import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";
import { AnalysisQuery } from "./dto";
import { FinexClsStore } from "@utils";
import { ClsService } from "nestjs-cls";
import { AnalysisNotFoundError } from "./errors";

@Injectable()
export class AnalysisService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	private calculateMedian(arr: number[]) {
		const mid = Math.floor(arr.length / 2);

		if (arr.length % 2 === 0) {
			return (arr[mid - 1] + arr[mid]) / 2;
		} else {
			return arr[mid];
		}
	}

	private calculateVariance(arr: number[], mean: number) {
		const squaredDifferences = arr.map((num) => (num - mean) ** 2);
		const variance =
			squaredDifferences.reduce((acc, num) => acc + num, 0) / arr.length;
		return variance;
	}

	async updateMonthlyAnalysis(
		budget: BudgetDocumentType,
		analyzeDate: dayjs.Dayjs,
	) {
		let [dailyAnalysisList, monthlyAnalysis, extractedRecords] =
			await Promise.all([
				DailyAnalysisModel.find({
					budget: budget._id,
					month: analyzeDate.get("month"),
					year: analyzeDate.get("year"),
				}),
				MonthlyAnalysisModel.findOne({
					budget: budget._id,
					month: analyzeDate.get("month"),
					year: analyzeDate.get("year"),
				}),
				ExtractedRecordModel.find({
					budget: budget._id,
					createdAt: {
						$gte: analyzeDate.startOf("month").toDate(),
						$lte: analyzeDate.endOf("month").toDate(),
					},
				}),
			]);
		if (!monthlyAnalysis) {
			monthlyAnalysis = new MonthlyAnalysisModel({
				total: 0,
				avg: 0,
				median: 0,
				variant: 0,
				budget: budget._id,
				month: analyzeDate.get("month"),
				year: analyzeDate.get("year"),
			});
		}
		const arr = dailyAnalysisList.map((item) => item.total);
		arr.sort((a, b) => a - b);
		let total = 0;
		for (const x of arr) {
			total += x;
		}
		const avg =
			dailyAnalysisList.length > 0 ? total / dailyAnalysisList.length : 0;
		const median = this.calculateMedian(arr);
		const variant = this.calculateVariance(arr, avg);

		monthlyAnalysis.total = total;
		monthlyAnalysis.avg = avg;
		monthlyAnalysis.median = median;
		monthlyAnalysis.variant = variant;

		const ai = AiServiceFactory.getAiService("openai");
		const output = await ai.analyzeMonth({
			dailyAnalysis: dailyAnalysisList.map((item) => ({
				total: item.total,
				date: item.date,
				month: item.month + 1,
				year: item.year,
			})),
			total: monthlyAnalysis.total,
			extractedRecords: extractedRecords.map((item) => ({
				total: item.amount,
				content: item.content,
				createdAt: item.createdAt,
				categories: item.categories.map((item1) => item1.name),
			})),
		});

		monthlyAnalysis.comment = output.comment;
		const accountId = this.cls.get("account.id");
		await AccountModel.findByIdAndUpdate(accountId, {
			comment: output.comment,
		});
		await monthlyAnalysis.save();
	}

	async updateDailyAnalysis(
		budget: BudgetDocumentType,
		analyzeDate: dayjs.Dayjs,
	) {
		let [records, dailyAnalysis] = await Promise.all([
			RecordModel.find({
				createdAt: {
					$gte: analyzeDate.startOf("date").toDate(),
					$lte: analyzeDate.endOf("date").toDate(),
				},
				budget: budget._id,
			}),
			DailyAnalysisModel.findOne({
				budget: budget._id,
				date: analyzeDate.date(),
				month: analyzeDate.month(),
				year: analyzeDate.year(),
			}),
			ExtractedRecordModel.deleteMany({
				createdAt: {
					$gte: analyzeDate.startOf("date").toDate(),
					$lte: analyzeDate.endOf("date").toDate(),
				},
				budget: budget._id,
			}),
		]);

		if (!dailyAnalysis) {
			dailyAnalysis = new DailyAnalysisModel({
				budget: budget._id,
				date: analyzeDate.date(),
				month: analyzeDate.month(),
				year: analyzeDate.year(),
				total: 0,
			});
		}
		let extractedRecords = [];

		if (records.length > 0) {
			const aiService = AiServiceFactory.getAiService("openai");

			const categories = await CategoryModel.find({
				language: budget.language,
			});

			const result = await aiService.extractRecords({
				currencyUnit: budget.currencyUnit,
				language: budget.language,
				records: records.map((item, index) => ({
					index: index,
					content: item.content,
				})),
				categories: categories.map((item) => ({
					id: item._id.toString(),
					name: item.name,
				})),
			});
			if (!(result.describe && result.extractedRecords)) {
				console.log("Error result:");
				console.log(result);
				return;
			}

			dailyAnalysis.total = 0;
			extractedRecords = result.extractedRecords.map((item) => {
				dailyAnalysis.total += item.amount;
				const record = records[item.index];
				return new ExtractedRecordModel({
					budget: budget._id,
					record: record._id,
					amount: item.amount,
					content: item.content,
					categories: item.categories,
					createdAt: record.createdAt,
				});
			});
		}

		await Promise.all([
			dailyAnalysis.save(),
			extractedRecords.length > 0 &&
				ExtractedRecordModel.bulkSave(extractedRecords),
		]);
	}

	async analyze(budgetId: string, analyzeDate: dayjs.Dayjs) {
		const budget = await BudgetModel.findById(budgetId);
		await this.updateDailyAnalysis(budget, analyzeDate);
		await this.updateMonthlyAnalysis(budget, analyzeDate);
	}

	async getDailyAnalysis(query: AnalysisQuery) {
		const budgetId = this.cls.get("budget.id");
		const d = dayjs(query.date, "YYYY-MM-DD");
		const document = await DailyAnalysisModel.findOne({
			budget: budgetId,
			date: d.date(),
			month: d.month(),
			year: d.year(),
		});
		if (!document) throw new AnalysisNotFoundError();
		return document;
	}

	async getExtractedRecords(query: AnalysisQuery) {
		const budgetId = this.cls.get("budget.id");
		const d = dayjs(query.date, "YYYY-MM-DD");
		return await ExtractedRecordModel.find({
			createdAt: {
				$gte: d.startOf("date").toDate(),
				$lte: d.endOf("date").toDate(),
			},
			budget: budgetId,
		})
			.populate("categories")
			.exec();
	}

	async getMonthlyAnalysis(query: AnalysisQuery) {
		const budgetId = this.cls.get("budget.id");
		const d = dayjs(query.date, "YYYY-MM-DD");
		const monthlyAnalysis = await MonthlyAnalysisModel.findOne({
			budget: budgetId,
			month: d.month(),
			year: d.year(),
		});
		const dailyAnalysis = await DailyAnalysisModel.find({
			year: d.year(),
			month: d.month(),
			budget: budgetId,
		});

		return { monthlyAnalysis, dailyAnalysis };
	}
}
