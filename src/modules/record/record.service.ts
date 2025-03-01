import { Injectable } from "@nestjs/common";
import { CreateRecordRequest, UpdateRecordRequest, RecordQuery } from "./dto";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { RecordModel } from "@db/models";

@Injectable()
export class RecordService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	async createOne(dto: CreateRecordRequest) {
		const boardId = this.cls.get("board.id");
		const record = new RecordModel({
			...dto,
			board: boardId,
		});
		return await record.save();
	}

	async updateOne(id: string | number, dto: UpdateRecordRequest) {}

	async findMany(query: RecordQuery) {}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}
