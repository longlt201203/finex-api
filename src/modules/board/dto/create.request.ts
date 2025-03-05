import { ApiProperty } from "@nestjs/swagger";

export class CreateBoardRequest {
	@ApiProperty()
	title: string;

	@ApiProperty({ example: "VND" })
	currencyUnit: string;

	@ApiProperty({ example: "vi" })
	language: string;
}
