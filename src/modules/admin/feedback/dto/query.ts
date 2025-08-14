import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { FeedbackStatusEnum } from "@db/models";

export class AdminFeedbackQuery {
	@ApiProperty({ required: false, enum: FeedbackStatusEnum })
	@IsOptional()
	@IsEnum(FeedbackStatusEnum)
	status?: FeedbackStatusEnum;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	type?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	userId?: string;
}
