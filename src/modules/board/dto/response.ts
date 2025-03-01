import { BoardDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class BoardResponse {
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

	static fromDocument(d: BoardDocumentType): BoardResponse {
		return {
			id: d._id.toString(),
			title: d.title,
			language: d.language,
			currencyUnit: d.currencyUnit,
			createdAt: d.createdAt,
			isAnalyzed: d.isAnalyzed,
			isDeleted: d.isDeleted,
			updatedAt: d.updatedAt,
		};
	}

	static fromDocuments(d: BoardDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
