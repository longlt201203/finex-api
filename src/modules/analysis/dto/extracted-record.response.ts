import { CategoryResponse } from "@modules/category/dto";
import { ApiProperty } from "@nestjs/swagger";

export class ExtractedRecordResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	amount: number;

	@ApiProperty()
	notes: string;

	@ApiProperty({ type: Date })
	createdAt: Date;

	@ApiProperty({ type: CategoryResponse, isArray: true })
	categories: CategoryResponse[];
}
