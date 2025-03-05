import { Module } from "@nestjs/common";
import { AnalysisService } from "./analysis.service";
import { AnalysisController } from "./analysis.controller";
import { BoardModule } from "@modules/board";

@Module({
	providers: [AnalysisService],
	exports: [AnalysisService],
	controllers: [AnalysisController],
	imports: [BoardModule],
})
export class AnalysisModule {}
