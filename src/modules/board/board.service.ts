import { Injectable } from "@nestjs/common";
import { CreateBoardRequest, UpdateBoardRequest, BoardQuery } from "./dto";
import { BoardModel } from "@db/models";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { BoardNotFoundError } from "./errors";

@Injectable()
export class BoardService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	async createOne(dto: CreateBoardRequest) {
		const document = new BoardModel({
			...dto,
			account: this.cls.get("account.id"),
		});
		return await document.save();
	}

	async updateOne(id: string | number, dto: UpdateBoardRequest) {}

	async findMany(query: BoardQuery) {
		return await BoardModel.find();
	}

	async findOne(id: string) {
		const accountId = this.cls.get("account.id");
		const board = await BoardModel.findById(id).populate("account").exec();
		if (!board || board.account._id.toString() != accountId)
			throw new BoardNotFoundError();
		return board;
	}

	async deleteOne(id: string | number) {}
}
