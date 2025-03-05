import { Injectable } from "@nestjs/common";
import { CreateRecordRequest, UpdateRecordRequest, RecordQuery } from "./dto";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { RecordModel } from "@db/models";
import { RecordNotFoundError } from "./errors";
import * as dayjs from "dayjs";
import { AnalysisService } from "@modules/analysis";

@Injectable()
export class RecordService {
	constructor(
		private readonly cls: ClsService<FinexClsStore>,
		private readonly analysisService: AnalysisService,
	) {}

	async createOne(dto: CreateRecordRequest) {
		const boardId = this.cls.get("board.id");
		let record = new RecordModel({
			content: dto.content,
			createdAt: dto.createdAt,
			board: boardId,
		});
		record = await record.save();
		this.analysisService.analyze(boardId, dayjs(record.createdAt));
	}

	async updateOne(id: string, dto: UpdateRecordRequest) {
		const boardId = this.cls.get("board.id");
		let record = await RecordModel.findByIdAndUpdate(id, {
			content: dto.content,
			createdAt: dto.createdAt,
		});
		if (!record) throw new RecordNotFoundError();
		this.analysisService.analyze(boardId, dayjs(record.createdAt));
	}

	async findMany(query: RecordQuery) {
		const boardId = this.cls.get("board.id");
		const date = dayjs(query.date, "YYYY-MM-DD");
		const records = await RecordModel.find({
			board: boardId,
			createdAt: {
				$gte: date.startOf("date").toDate(),
				$lte: date.endOf("date").toDate(),
			},
		});
		return records;
	}

	async findOne(id: string) {
		const record = await RecordModel.findById(id);
		if (!record) throw new RecordNotFoundError();
		return record;
	}

	async deleteOne(id: string) {
		const boardId = this.cls.get("board.id");
		const record = await RecordModel.findByIdAndDelete(id);
		if (!record) throw new RecordNotFoundError();
		this.analysisService.analyze(boardId, dayjs(record.createdAt));
	}
}
