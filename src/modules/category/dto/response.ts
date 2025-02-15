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
}
