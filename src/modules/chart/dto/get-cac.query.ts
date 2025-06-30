import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class GetCacQuery {
	@ApiProperty({ type: Date, example: new Date() })
	@IsDate()
	year: Date;
}
