import { Module } from "@nestjs/common";
import { AdminFeedbackService } from "./admin-feedback.service";
import { AdminFeedbackController } from "./admin-feedback.controller";

@Module({
	providers: [AdminFeedbackService],
	controllers: [AdminFeedbackController],
	exports: [AdminFeedbackService],
})
export class AdminFeedbackModule {}
