import { Injectable } from "@nestjs/common";
import { CreateRecordRequest, UpdateRecordRequest, RecordQuery } from "./dto";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { RecordModel } from "@db/models";
import { RecordNotFoundError } from "./errors";
import { BoardService } from "@modules/board";
import * as dayjs from "dayjs";

@Injectable()
export class RecordService {
	constructor(
		private readonly cls: ClsService<FinexClsStore>,
		private readonly boardService: BoardService,
	) {}

	async createOne(dto: CreateRecordRequest) {
		const boardId = this.cls.get("board.id");
		const createdAt = dayjs(dto.createdAt);
		const record = new RecordModel({
			...dto,
			board: boardId,
			date: createdAt.date(),
			month: createdAt.month(),
			year: createdAt.year(),
		});
		return await record.save();
	}

	async updateOne(id: string, dto: UpdateRecordRequest) {
		const createdAt = dayjs(dto.createdAt);
		const record = await RecordModel.findByIdAndUpdate(id, {
			...dto,
			date: createdAt.date(),
			month: createdAt.month(),
			year: createdAt.year(),
		});
		if (!record) throw new RecordNotFoundError();
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
	}
}
