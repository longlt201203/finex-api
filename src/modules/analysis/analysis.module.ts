import { Module } from "@nestjs/common";
import { AnalysisService } from "./analysis.service";
import { AnalysisController } from "./analysis.controller";
import { BudgetModule } from "@modules/budget";

@Module({
	providers: [AnalysisService],
	exports: [AnalysisService],
	controllers: [AnalysisController],
	imports: [BudgetModule],
})
export class AnalysisModule {}
