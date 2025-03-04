import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateRecordRequest {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	content: string;

	@ApiProperty({
		type: Date,
		required: false,
	})
	@IsDate()
	@Optional()
	createdAt: Date;
}
