import { Module } from "@nestjs/common";
import { AdminUserSubscriptionModule } from "./user-subscription";

@Module({
	imports: [AdminUserSubscriptionModule],
	exports: [AdminUserSubscriptionModule],
})
export class AdminModule {}
