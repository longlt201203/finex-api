import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountRequest } from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { SkipAuth } from "@modules/auth";
import { UpdateAccountRequest } from "./dto/update-account.request";

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

	@Get()
	@SwaggerApiResponse(Object)
	async getAccounts() {
		const accounts = await this.accountService.getAccounts();
		return new ApiResponseDto(accounts, null, "Accounts fetched successfully");
	}

	@Get(":id")
	@SwaggerApiResponse(Object)
	async getAccountById(@Param("id") id: string) {
		const account = await this.accountService.getAccountById(id);
		return new ApiResponseDto(account, null, "Account fetched successfully");
	}

	@Put(":id")
	@SwaggerApiResponse(Object)
	async updateAccount(
		@Param("id") id: string,
		@Body() dto: UpdateAccountRequest,
	) {
		await this.accountService.updateAccount(id, dto);
		return new ApiResponseDto(null, null, "Account updated successfully");
	}

	@Delete(":id")
	@SwaggerApiResponse(Object)
	async deleteAccount(@Param("id") id: string) {
		await this.accountService.deleteAccount(id);
		return new ApiResponseDto(null, null, "Account deleted successfully");
	}
}
