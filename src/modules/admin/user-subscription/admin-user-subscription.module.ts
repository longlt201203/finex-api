import { Module } from "@nestjs/common";
import { AdminUserSubscriptionController } from "./admin-user-subscription.controller";
import { AdminUserSubscriptionService } from "./admin-user-subscription.service";

@Module({
	controllers: [AdminUserSubscriptionController],
	providers: [AdminUserSubscriptionService],
	exports: [AdminUserSubscriptionService],
})
export class AdminUserSubscriptionModule {}
