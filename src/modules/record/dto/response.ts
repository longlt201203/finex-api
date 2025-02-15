import { ApiProperty } from "@nestjs/swagger";

export class RecordResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	content: string;

	@ApiProperty({ type: Date })
	createdAt: Date;
}
