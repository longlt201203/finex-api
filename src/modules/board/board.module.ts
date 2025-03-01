import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { AnalysisModule } from "@modules/analysis";

@Module({
	providers: [BoardService],
	exports: [BoardService],
	controllers: [BoardController],
	imports: [AnalysisModule],
})
export class BoardModule {}
