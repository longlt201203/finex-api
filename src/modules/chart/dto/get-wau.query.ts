import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class GetWauQuery {
	@ApiProperty({ type: Date, example: new Date() })
	@IsDate()
	week: Date;
}
