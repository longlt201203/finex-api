import { ApiProperty } from "@nestjs/swagger";

export class MonthlyAnalysisResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	total: number;

	@ApiProperty()
	avg: number;

	@ApiProperty()
	variant: number;

	@ApiProperty()
	median: number;

	@ApiProperty()
	month: number;

	@ApiProperty()
	year: number;
}
