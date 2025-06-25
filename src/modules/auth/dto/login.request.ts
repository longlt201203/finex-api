import { ApiProperty } from "@nestjs/swagger";
import { AuthProviderEnum, AuthSchemeEnum } from "@utils";
import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

export class LoginRequest {
	@ApiProperty({ enum: AuthSchemeEnum })
	@IsEnum(AuthSchemeEnum, { message: "Invalid Auth Scheme" })
	scheme: AuthSchemeEnum;

	@ApiProperty({ example: "ZXhhbXBsZUBlbWFpbC5jb206QWJjQDEyMw==" })
	@IsString()
	@IsNotEmpty()
	code: string;

	@ApiProperty({ enum: AuthProviderEnum, required: false })
	@IsEnum(AuthProviderEnum, { message: "Invalid Auth Provider" })
	@IsOptional()
	provider?: AuthProviderEnum;

	@ApiProperty({ type: Boolean, required: false })
	@IsBoolean()
	@IsOptional()
	isCookie?: boolean;
}
