import { Injectable } from "@nestjs/common";
import { CreateBoardRequest, UpdateBoardRequest, BoardQuery } from "./dto";

@Injectable()
export class BoardService {
	async createOne(dto: CreateBoardRequest) {}

	async updateOne(id: string | number, dto: UpdateBoardRequest) {}

	async findMany(query: BoardQuery) {}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}
