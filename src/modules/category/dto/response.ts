import { CategoryDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	language: string;

	@ApiProperty()
	color: string;

	static fromDocument(d: CategoryDocumentType): CategoryResponse {
		return {
			id: d._id.toString(),
			color: d.color,
			language: d.language,
			name: d.name,
		};
	}

	static fromDocuments(d: CategoryDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
