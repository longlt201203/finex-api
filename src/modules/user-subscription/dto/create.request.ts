import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsOptional } from "class-validator";

export class CreateUserSubscriptionRequest {
	@ApiProperty()
	@IsMongoId()
	subscriptionId: string;

	@ApiProperty({ required: false })
	@IsDateString()
	@IsOptional()
	expiryDate?: Date;
}
