import { RecordDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";
import * as dayjs from "dayjs";

export class RecordResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	content: string;

	@ApiProperty({
		example: dayjs().format("DD/HH/YYYY HH:mm:ss"),
		description: "Dayjs format DD/MM/YYYY HH:mm:ss",
	})
	createdAt: string;

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
