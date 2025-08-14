import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { FeedbackStatusEnum } from "@db/models";

export class UpdateFeedbackStatusRequest {
	@ApiProperty({ enum: FeedbackStatusEnum })
	@IsEnum(FeedbackStatusEnum)
	status: FeedbackStatusEnum;
}
