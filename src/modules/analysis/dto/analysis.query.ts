import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class AnalysisQuery {
	@ApiProperty({ required: false })
	@Type(() => Number)
	date?: number;

	@ApiProperty({ required: false })
	@Type(() => Number)
	month?: number;

	@ApiProperty({ required: false })
	@Type(() => Number)
	year?: number;
}
