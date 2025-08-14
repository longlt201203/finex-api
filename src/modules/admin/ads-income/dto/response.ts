import { ApiProperty } from "@nestjs/swagger";
import { AdsIncomeDocumentType } from "@db/models";

export class AdsIncomeRecordResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	source: string;

	@ApiProperty()
	amount: number;

	@ApiProperty()
	currency: string;

	@ApiProperty({ description: "ISO date" })
	date: Date;

	@ApiProperty({ required: false })
	status?: string;

	static fromDocument(d: AdsIncomeDocumentType): AdsIncomeRecordResponse {
		return {
			id: d._id.toString(),
			source: d.source,
			amount: d.amount,
			currency: d.currency,
			date: d.date,
			status: d.status,
		} as any;
	}

	static fromDocuments(docs: AdsIncomeDocumentType[]) {
		return docs.map(this.fromDocument);
	}
}

export class AdsIncomeSummaryResponse {
	@ApiProperty()
	total: number;
	@ApiProperty()
	paid: number;
	@ApiProperty()
	pending: number;
	@ApiProperty()
	failed: number;
	@ApiProperty()
	currency: string;
}
