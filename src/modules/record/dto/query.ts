import { ApiProperty } from "@nestjs/swagger";
import { IsDayjsString } from "@utils";
import * as dayjs from "dayjs";

export class RecordQuery {
	@ApiProperty({ example: dayjs().format("YYYY-MM-DD") })
	@IsDayjsString("YYYY-MM-DD")
	date: string;
}
