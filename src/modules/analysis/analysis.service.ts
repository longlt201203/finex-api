import {
	BoardDocumentType,
	BoardModel,
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

	async updateMonthlyAnalysis(
		board: BoardDocumentType,
		analyzeDate: dayjs.Dayjs,
	) {
		// let [dailyAnalysisList, monthlyAnalysis] = await Promise.all([
		// 	DailyAnalysisModel.find({
		// 		board: board._id,
		// 		month: analyzeDate.get("month"),
		// 		year: analyzeDate.get("year"),
		// 	}),
		// 	MonthlyAnalysisModel.findOne({
		// 		board: board._id,
		// 		month: analyzeDate.get("month"),
		// 		year: analyzeDate.get("year"),
		// 	}),
		// ]);
		// if (!monthlyAnalysis) {
		// 	monthlyAnalysis = new MonthlyAnalysisModel({
		// 		total: 0,
		// 		avg: 0,
		// 		median: 0,
		// 		variant: 0,
		// 		board: board._id,
		// 		month: analyzeDate.get("month"),
		// 		year: analyzeDate.get("year"),
		// 	});
		// }
		// dailyAnalysisList.sort((a, b) => a.total - b.total);
		// let total = 0;
		// for (const item of dailyAnalysisList) {
		// 	total += item.total;
		// }
		// const avg =
		// 	dailyAnalysisList.length > 0 ? total / dailyAnalysisList.length : 0;
		// await monthlyAnalysis.save();
	}

	async updateDailyAnalysis(
		board: BoardDocumentType,
		analyzeDate: dayjs.Dayjs,
	) {
		let [records, dailyAnalysis] = await Promise.all([
			RecordModel.find({
				createdAt: {
					$gte: analyzeDate.startOf("date").toDate(),
					$lte: analyzeDate.endOf("date").toDate(),
				},
				board: board._id,
			}),
			DailyAnalysisModel.findOne({
				board: board._id,
				date: analyzeDate.date(),
				month: analyzeDate.month(),
				year: analyzeDate.year(),
			}),
			ExtractedRecordModel.deleteMany({
				createdAt: {
					$gte: analyzeDate.startOf("date").toDate(),
					$lte: analyzeDate.endOf("date").toDate(),
				},
				board: board._id,
			}),
		]);

		if (!dailyAnalysis) {
			dailyAnalysis = new DailyAnalysisModel({
				board: board._id,
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
				language: board.language,
			});

			const result = await aiService.extractRecords({
				currencyUnit: board.currencyUnit,
				language: board.language,
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
					board: board._id,
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

	async analyze(boardId: string, analyzeDate: dayjs.Dayjs) {
		const board = await BoardModel.findById(boardId);
		await this.updateDailyAnalysis(board, analyzeDate);
		await this.updateMonthlyAnalysis(board, analyzeDate);
	}

	async getDailyAnalysis(query: AnalysisQuery) {
		const boardId = this.cls.get("board.id");
		const d = dayjs(query.date, "YYYY-MM-DD");
		const document = await DailyAnalysisModel.findOne({
			board: boardId,
			date: d.date(),
			month: d.month(),
			year: d.year(),
		});
		if (!document) throw new AnalysisNotFoundError();
		return document;
	}

	async getExtractedRecords(query: AnalysisQuery) {
		const boardId = this.cls.get("board.id");
		const d = dayjs(query.date, "YYYY-MM-DD");
		return await ExtractedRecordModel.find({
			createdAt: {
				$gte: d.startOf("date").toDate(),
				$lte: d.endOf("date").toDate(),
			},
			board: boardId,
		})
			.populate("categories")
			.exec();
	}
}
