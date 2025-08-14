import { ApiProperty } from "@nestjs/swagger";
import {
	IsISO8601,
	IsNumberString,
	IsOptional,
	IsString,
} from "class-validator";

export class AdsIncomeQueryParams {
	@ApiProperty({ required: false, description: "ISO datetime" })
	@IsOptional()
	@IsISO8601()
	from?: string;

	@ApiProperty({ required: false, description: "ISO datetime" })
	@IsOptional()
	@IsISO8601()
	to?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	source?: string;

	@ApiProperty({ required: false, enum: ["paid", "pending", "failed"] })
	@IsOptional()
	@IsString()
	status?: string;
}
