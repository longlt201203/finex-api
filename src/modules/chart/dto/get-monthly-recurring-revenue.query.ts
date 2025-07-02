import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class GetMonthlyRecurringRevenueQuery {
	@ApiProperty({ type: Date, example: new Date() })
	@IsDate()
	year: Date;
}
