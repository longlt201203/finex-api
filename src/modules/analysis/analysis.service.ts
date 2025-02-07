import { RecordModel } from "@db/models";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AnalysisService {
	async dailyAnalysis(boardId: string) {
		RecordModel.find({ board: boardId });
	}
}
