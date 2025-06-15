import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsMongoId, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { UserSubscriptionPaymentStatus } from "@db/models/user-subscription.model";

export class UserSubscriptionQuery {
	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	@Transform(({ value }) => value === "true")
	active?: boolean;

	@ApiProperty({ required: false })
	@IsMongoId()
	@IsOptional()
	subscriptionId?: string;

	@ApiProperty({ required: false, enum: UserSubscriptionPaymentStatus })
	@IsEnum(UserSubscriptionPaymentStatus)
	@IsOptional()
	paymentStatus?: UserSubscriptionPaymentStatus;
}
