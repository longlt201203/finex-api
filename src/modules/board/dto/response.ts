import { ApiProperty } from "@nestjs/swagger";

export class BoardResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	title: string;

	@ApiProperty()
	currencyUnit: string;

	@ApiProperty()
	language: string;

	@ApiProperty({ type: Date })
	createdAt: Date;

	@ApiProperty({ type: Date })
	updatedAt: Date;

	@ApiProperty()
	isAnalyzed: boolean;

	@ApiProperty()
	isDeleted: boolean;
}
