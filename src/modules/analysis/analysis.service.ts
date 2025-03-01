import { BoardDocumentType, RecordDocumentType } from "@db/models";
import { AiServiceFactory } from "@modules/ai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnalysisService {
	async analyze(board: BoardDocumentType, records: RecordDocumentType[]) {
		const aiService = AiServiceFactory.getAiService("openai");
	}
}
