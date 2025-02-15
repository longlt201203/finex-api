import { Injectable } from "@nestjs/common";
import { CreateRecordRequest, UpdateRecordRequest, RecordQuery } from "./dto";

@Injectable()
export class RecordService {
	async createOne(dto: CreateRecordRequest) {}

	async updateOne(id: string | number, dto: UpdateRecordRequest) {}

	async findMany(query: RecordQuery) {}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}
