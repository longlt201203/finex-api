import { Injectable } from "@nestjs/common";
import { CreateRecordRequest, UpdateRecordRequest, RecordQuery } from "./dto";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { RecordModel } from "@db/models";
import { RecordNotFoundError } from "./errors";
import { BoardService } from "@modules/board";

@Injectable()
export class RecordService {
	constructor(
		private readonly cls: ClsService<FinexClsStore>,
		private readonly boardService: BoardService,
	) {}

	async createOne(dto: CreateRecordRequest) {
		const boardId = this.cls.get("board.id");
		let record = new RecordModel({
			content: dto.content,
			createdAt: dto.createdAt,
			board: boardId,
		});
		record = await record.save();
		this.boardService.analyze(record);
	}

	async updateOne(id: string, dto: UpdateRecordRequest) {
		let record = await RecordModel.findByIdAndUpdate(id, {
			content: dto.content,
			createdAt: dto.createdAt,
		});
		if (!record) throw new RecordNotFoundError();
		this.boardService.analyze(record);
	}

	async findMany(query: RecordQuery) {
		const boardId = this.cls.get("board.id");
		const records = await RecordModel.find({
			board: boardId,
		});
		return records;
	}

	async findOne(id: string) {
		const record = await RecordModel.findById(id);
		if (!record) throw new RecordNotFoundError();
		return record;
	}

	async deleteOne(id: string) {
		const record = await RecordModel.findByIdAndDelete(id);
		if (!record) throw new RecordNotFoundError();
		this.boardService.analyze(record);
	}
}
