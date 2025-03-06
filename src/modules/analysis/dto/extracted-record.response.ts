import { ExtractedRecordDocumentType } from "@db/models/extracted-record.model";
import { CategoryResponse } from "@modules/category/dto";
import { ApiProperty } from "@nestjs/swagger";

export class ExtractedRecordResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	amount: number;

	@ApiProperty({ type: Date })
	createdAt: Date;

	@ApiProperty({ type: CategoryResponse, isArray: true })
	categories: CategoryResponse[];

	static fromDocument(d: ExtractedRecordDocumentType): ExtractedRecordResponse {
		return {
			id: d._id.toString(),
			amount: d.amount,
			content: d.content,
			createdAt: d.createdAt,
			categories: d.categories
				? CategoryResponse.fromDocuments(d.categories)
				: [],
		};
	}

	static fromDocuments(d: ExtractedRecordDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
