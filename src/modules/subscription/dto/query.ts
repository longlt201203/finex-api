import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionQuery {
	@ApiProperty({ required: false })
	active?: boolean;
}
