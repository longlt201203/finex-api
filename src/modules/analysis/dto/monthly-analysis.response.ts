import {
	DailyAnalysisDocumentType,
	MonthlyAnalysisDocumentType,
} from "@db/models";
import { ApiProperty } from "@nestjs/swagger";
import * as dayjs from "dayjs";

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

	@ApiProperty()
	chart: number[];

	static formDocument(
		d: MonthlyAnalysisDocumentType,
		dailyAnalysis: DailyAnalysisDocumentType[],
	): MonthlyAnalysisResponse {
		const djs = dayjs(new Date(d.year, d.month, 1));
		const chart = Array.from({
			length:
				djs.endOf("month").get("date") - djs.startOf("month").get("date") + 1,
		}).map((_) => 0);
		dailyAnalysis.forEach((item) => {
			chart[item.date - 1] = item.total;
		});

		return {
			id: d._id.toString(),
			avg: d.avg,
			median: d.median,
			month: d.month,
			total: d.total,
			variant: d.variant,
			year: d.year,
			chart: chart,
		};
	}
}
