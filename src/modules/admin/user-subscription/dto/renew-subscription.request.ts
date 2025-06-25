import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";
import { Transform } from "class-transformer";

export class RenewSubscriptionRequest {
	@ApiProperty({
		required: false,
		default: 1,
		description: "Number of months to add to the subscription",
	})
	@IsOptional()
	@IsInt()
	@Min(1)
	@Transform(({ value }) => parseInt(value))
	monthsToAdd?: number = 1;
}
