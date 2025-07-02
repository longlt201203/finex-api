import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class GetChurnRateQuery {
	@ApiProperty({ type: Date, example: new Date() })
	@IsDate()
	year: Date;
}
