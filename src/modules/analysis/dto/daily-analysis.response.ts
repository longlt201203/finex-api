import { ApiProperty } from "@nestjs/swagger";

export class DailyAnalysisResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	total: number;

	@ApiProperty()
	date: number;

	@ApiProperty()
	month: number;

	@ApiProperty()
	year: number;
}
