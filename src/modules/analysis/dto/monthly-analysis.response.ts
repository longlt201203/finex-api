import { MonthlyAnalysisDocumentType } from "@db/models";
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

	static formDocument(d: MonthlyAnalysisDocumentType): MonthlyAnalysisResponse {
		return {
			id: d._id.toString(),
			avg: d.avg,
			median: d.median,
			month: d.month,
			total: d.total,
			variant: d.variant,
			year: d.year,
		};
	}
}
