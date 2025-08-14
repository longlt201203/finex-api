import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateFeedbackRequest {
	@ApiProperty()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsNotEmpty()
	content: string;

	@ApiProperty()
	@IsNotEmpty()
	type: string;

	@ApiProperty({ minimum: 1, maximum: 5 })
	@IsInt()
	@Min(1)
	@Max(5)
	rating: number;
}
