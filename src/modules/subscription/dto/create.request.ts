import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionRequest {
	@ApiProperty()
	name: string;

	@ApiProperty()
	price: number;

	@ApiProperty({ example: "USD" })
	currencyUnit: string;

	@ApiProperty()
	startDate: Date;

	@ApiProperty()
	endDate: Date;

	@ApiProperty({ required: false })
	description?: string;
}
