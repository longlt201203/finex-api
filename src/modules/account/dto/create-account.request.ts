import { ApiProperty } from "@nestjs/swagger";
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
	Length,
} from "class-validator";

export class CreateAccountRequest {
	@ApiProperty({ example: "example@email.com" })
	@IsEmail()
	email: string;

	@ApiProperty({ example: "Abc@123" })
	@IsStrongPassword({
		minLength: 6,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;

	@ApiProperty()
	@IsString()
	@Length(1, 20)
	@IsNotEmpty()
	fname: string;

	@ApiProperty()
	@IsString()
	@Length(1, 20)
	@IsNotEmpty()
	lname: string;

	@ApiProperty()
	@IsPhoneNumber("VN")
	phone: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	avt?: string;
}
