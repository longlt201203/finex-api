import { Module } from "@nestjs/common";
import { RecordService } from "./record.service";
import { RecordController } from "./record.controller";
import { AnalysisModule } from "@modules/analysis";
import { BudgetModule } from "@modules/budget";

@Module({
	providers: [RecordService],
	exports: [RecordService],
	controllers: [RecordController],
	imports: [BudgetModule, AnalysisModule],
})
export class RecordModule {}
