import { Module } from "@nestjs/common";
import { AdminUserSubscriptionModule } from "./user-subscription";
import { AdminFeedbackModule } from "./feedback/admin-feedback.module";
import { AdminAdsIncomeModule } from "./ads-income/admin-ads-income.module";

@Module({
	imports: [
		AdminUserSubscriptionModule,
		AdminFeedbackModule,
		AdminAdsIncomeModule,
	],
	exports: [
		AdminUserSubscriptionModule,
		AdminFeedbackModule,
		AdminAdsIncomeModule,
	],
})
export class AdminModule {}
