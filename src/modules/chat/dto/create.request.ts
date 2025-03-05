import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateChatRequest {
	@ApiProperty()
	@IsString()
	message: string;
}
