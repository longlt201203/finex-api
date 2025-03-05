import { RecordDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class RecordResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	content: string;

	@ApiProperty({ type: Date })
	createdAt: Date;

	static fromDocument(d: RecordDocumentType): RecordResponse {
		return {
			id: d._id.toString(),
			content: d.content,
			createdAt: d.createdAt,
		};
	}

	static fromDocuments(d: RecordDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
