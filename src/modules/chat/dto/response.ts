import { ChatDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class ChatResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	role: string;

	@ApiProperty()
	message: string;

	static fromDocument(d: ChatDocumentType): ChatResponse {
		return {
			id: d._id.toString(),
			message: d.message,
			role: d.role,
		};
	}

	static fromDocuments(d: ChatDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
