import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsOptional } from "class-validator";
import { UserSubscriptionPaymentStatus } from "@db/models/user-subscription.model";

export class UpdateUserSubscriptionRequest {
	@ApiProperty({ required: false })
	@IsDateString()
	@IsOptional()
	expiryDate?: Date;

	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	active?: boolean;

	@ApiProperty({ required: false, enum: UserSubscriptionPaymentStatus })
	@IsEnum(UserSubscriptionPaymentStatus)
	@IsOptional()
	paymentStatus?: UserSubscriptionPaymentStatus;
}
