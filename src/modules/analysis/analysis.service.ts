import { BoardModel, DailyAnalysisModel, RecordModel } from "@db/models";
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

	async analyze(boardId: string, analyzeDate: dayjs.Dayjs) {
		const [board, records] = await Promise.all([
			BoardModel.findById(boardId),
			RecordModel.find({
				createdAt: {
					$gte: analyzeDate.startOf("date").toDate(),
					$lte: analyzeDate.endOf("date").toDate(),
				},
				board: boardId,
			}),
			ExtractedRecordModel.deleteMany({
				createdAt: {
					$gte: analyzeDate.startOf("date").toDate(),
					$lte: analyzeDate.endOf("date").toDate(),
				},
				board: boardId,
			}),
		]);

		let dailyAnalysis = await DailyAnalysisModel.findOne({
			board: board._id,
			date: analyzeDate.date(),
			month: analyzeDate.month(),
			year: analyzeDate.year(),
		});
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

			const result = await aiService.extractRecords({
				currencyUnit: board.currencyUnit,
				language: board.language,
				records: records.map((item, index) => ({
					index: index,
					content: item.content,
				})),
			});
			if (!(result.describe && result.extractedRecords)) {
				console.log("Error result:");
				console.log(result);
				return;
			}

			extractedRecords = result.extractedRecords.map((item) => {
				dailyAnalysis.total += item.amount;
				const record = records[item.index];
				return new ExtractedRecordModel({
					board: board._id,
					record: record._id,
					amount: item.amount,
					content: item.content,
					categories: [],
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
}
