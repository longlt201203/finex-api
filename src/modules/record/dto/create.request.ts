import { ApiProperty } from "@nestjs/swagger";

export class CreateRecordRequest {
	@ApiProperty()
	content: string;
}
