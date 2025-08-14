import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsOptional, IsString } from "class-validator";

export class FeedbackQuery {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	status?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	type?: string;

	@ApiProperty({
		required: false,
		description: "if true, only current user's feedback",
	})
	@IsOptional()
	@IsBooleanString()
	mine?: string; // use string to parse 'true'|'false'
}
