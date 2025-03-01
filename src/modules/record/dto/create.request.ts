import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsDayjsString } from "@utils";
import { IsNotEmpty, IsString } from "class-validator";
import * as dayjs from "dayjs";

export class CreateRecordRequest {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	content: string;

	@ApiProperty({
		example: dayjs().format("DD/HH/YYYY HH:mm:ss"),
		description: "Dayjs format DD/MM/YYYY HH:mm:ss",
		required: false,
	})
	@IsDayjsString("DD/MM/YYYY HH:mm:ss")
	@Optional()
	createdAt?: string;
}
