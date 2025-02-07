import { ApiProperty } from "@nestjs/swagger";

export class CreateBoardRequest {
	@ApiProperty()
	title: string;

	@ApiProperty()
	currencyUnit: string;

	@ApiProperty()
	language: string;
}
