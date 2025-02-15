import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryRequest {
	@ApiProperty()
	name: string;

	@ApiProperty()
	language: string;

	@ApiProperty()
	color: string;
}
