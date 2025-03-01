import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { BoardService } from "./board.service";
import { BoardNotFoundError } from "./errors";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { BoardResponse } from "./dto";

@Injectable()
export class BoardGuard implements CanActivate {
	constructor(
		private readonly boardService: BoardService,
		private readonly cls: ClsService<FinexClsStore>,
	) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest<Request>();
		const { boardId } = req.params;
		if (!boardId) throw new BoardNotFoundError();
		const board = await this.boardService.findOne(boardId);
		this.cls.set("board", BoardResponse.fromDocument(board));
		return true;
	}
}
