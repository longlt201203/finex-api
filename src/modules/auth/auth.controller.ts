import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequest, TokenResponse } from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { AccountResponse } from "@modules/account/dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { SkipAuth } from "./skip-auth.decorator";
import { Response } from "express";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get("profile")
	@SwaggerApiResponse(AccountResponse)
	@ApiBearerAuth()
	async getProfile() {
		const data = this.authService.getProfileCls();
		return new ApiResponseDto(data, null, "Profile fetched successfully");
	}

	@Post("login")
	@SkipAuth()
	@SwaggerApiResponse(TokenResponse)
	async login(@Body() dto: LoginRequest, @Res() res: Response) {
		const data = await this.authService.login(dto);
		if (dto.isCookie) {
			res.cookie("accessToken", data.accessToken);
			return res.status(200).send();
		} else {
			return res
				.status(200)
				.send(new ApiResponseDto(data, null, "Login successful"));
		}
	}
}
