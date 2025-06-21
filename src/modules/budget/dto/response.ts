import { BudgetDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class BudgetResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	title: string;

	@ApiProperty()
	currencyUnit: string;

	@ApiProperty()
	language: string;

	@ApiProperty({ type: Date })
	createdAt: Date;

	@ApiProperty({ type: Date })
	updatedAt: Date;

	@ApiProperty()
	isAnalyzed: boolean;

	@ApiProperty()
	isDeleted: boolean;

	@ApiProperty()
	money: number;

	static fromDocument(d: BudgetDocumentType): BudgetResponse {
		return {
			id: d._id.toString(),
			title: d.title,
			language: d.language,
			currencyUnit: d.currencyUnit,
			createdAt: d.createdAt,
			isAnalyzed: d.isAnalyzed,
			isDeleted: d.isDeleted,
			updatedAt: d.updatedAt,
			money: d.money,
		};
	}

	static fromDocuments(d: BudgetDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
