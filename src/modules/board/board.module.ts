import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";

@Module({
	providers: [BoardService],
	exports: [BoardService],
	controllers: [BoardController],
})
export class BoardModule {}
