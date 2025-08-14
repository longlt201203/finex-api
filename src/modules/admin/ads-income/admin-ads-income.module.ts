import { Module } from "@nestjs/common";
import { AdminAdsIncomeService } from "./admin-ads-income.service";
import { AdminAdsIncomeController } from "./admin-ads-income.controller";

@Module({
	providers: [AdminAdsIncomeService],
	controllers: [AdminAdsIncomeController],
	exports: [AdminAdsIncomeService],
})
export class AdminAdsIncomeModule {}
