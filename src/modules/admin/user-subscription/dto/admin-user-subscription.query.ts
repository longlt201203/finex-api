import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsOptional, IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { UserSubscriptionPaymentStatus } from "@db/models/user-subscription.model";

export class AdminUserSubscriptionQuery {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsBoolean()
	@Transform(({ value }) => value === "true")
	active?: boolean;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsMongoId()
	subscriptionId?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsMongoId()
	accountId?: string;

	@ApiProperty({ required: false, enum: UserSubscriptionPaymentStatus })
	@IsOptional()
	@IsEnum(UserSubscriptionPaymentStatus)
	paymentStatus?: UserSubscriptionPaymentStatus;
}
