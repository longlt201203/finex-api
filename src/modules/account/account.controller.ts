import { Body, Controller, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountRequest } from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { SkipAuth } from "@modules/auth";

@Controller("account")
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post()
	@SkipAuth()
	@SwaggerApiResponse(Object)
	async createAccount(@Body() dto: CreateAccountRequest) {
		await this.accountService.createAccount(dto);
		return new ApiResponseDto(null, null, "Account created successfully");
	}
}
