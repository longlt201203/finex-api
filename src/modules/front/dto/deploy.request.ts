import { ApiProperty } from "@nestjs/swagger";

export class DeployRequest {
	@ApiProperty({ type: "string", format: "binary" })
	file: any;
}
