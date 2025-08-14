import { Module } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { FeedbackController } from "./feedback.controller";

@Module({
	providers: [FeedbackService],
	exports: [FeedbackService],
	controllers: [FeedbackController],
})
export class FeedbackModule {}
