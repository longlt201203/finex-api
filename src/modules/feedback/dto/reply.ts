import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateReplyRequest {
	@ApiProperty()
	@IsNotEmpty()
	content: string;
}

export class FeedbackReplyResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	userId: string;

	@ApiProperty()
	userName: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty({ required: false })
	isAdmin?: boolean;
}
