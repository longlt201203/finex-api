import { Module } from "@nestjs/common";
import { AdminUserSubscriptionModule } from "./user-subscription";
import { AdminFeedbackModule } from "./feedback/admin-feedback.module";

@Module({
	imports: [AdminUserSubscriptionModule, AdminFeedbackModule],
	exports: [AdminUserSubscriptionModule, AdminFeedbackModule],
})
export class AdminModule {}
