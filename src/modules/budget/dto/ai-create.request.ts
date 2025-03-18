import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AiCreateBudgetRequest {
	@ApiProperty({
		description: "User's description of the budget they want to create",
		example: "I want to track my monthly household expenses in Vietnam",
	})
	@IsString()
	prompt: string;

	@ApiProperty({
		description: "Language preference",
		example: "vi",
		default: "vi",
	})
	@IsString()
	language: string;
}
