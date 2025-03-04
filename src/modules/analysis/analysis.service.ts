import {
	BoardDocumentType,
	DailyAnalysisModel,
	RecordDocumentType,
} from "@db/models";
import { ExtractedRecordModel } from "@db/models/extracted-record.model";
import { AiServiceFactory } from "@modules/ai";
import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";

@Injectable()
export class AnalysisService {
	async analyze(
		analyzeDate: dayjs.Dayjs,
		board: BoardDocumentType,
		records: RecordDocumentType[],
	) {
		const dailyAnalysis = new DailyAnalysisModel({
			board: board._id,
			date: analyzeDate.date(),
			month: analyzeDate.month(),
			year: analyzeDate.year(),
			total: 0,
		});
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
}
