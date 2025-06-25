import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateBudgetRequest {
	@ApiProperty()
	title: string;

	@ApiProperty({ example: "VND" })
	currencyUnit: string;

	@ApiProperty({ example: "vi" })
	language: string;

	@ApiProperty({ example: 10000, required: false })
	@IsNumber()
	@IsOptional()
	money?: number;
}
