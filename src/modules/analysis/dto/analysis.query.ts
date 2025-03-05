import { ApiProperty } from "@nestjs/swagger";
import { IsDayjsString } from "@utils";
import { Type } from "class-transformer";

export class AnalysisQuery {
	@ApiProperty({ example: "2025-01-01" })
	@IsDayjsString("YYYY-MM-DD")
	date: string;
}
