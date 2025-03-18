import { Module } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { BudgetController } from "./budget.controller";

@Module({
	providers: [BudgetService],
	exports: [BudgetService],
	controllers: [BudgetController],
})
export class BudgetModule {}
