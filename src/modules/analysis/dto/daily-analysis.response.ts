import { DailyAnalysisDocumentType } from "@db/models";
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

	static fromDocument(d: DailyAnalysisDocumentType): DailyAnalysisResponse {
		return {
			id: d._id.toString(),
			date: d.date,
			month: d.month,
			year: d.year,
			total: d.total,
		};
	}
}
