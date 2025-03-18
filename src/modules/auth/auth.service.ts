import { Injectable } from "@nestjs/common";
import { LoginRequest, TokenResponse } from "./dto";
import { AuthSchemeEnum, Env, FinexClsStore } from "@utils";
import { WrongUsernameOrPasswordError } from "./errors";
import { AccountModel } from "@db/models";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ClsService } from "nestjs-cls";

@Injectable()
export class AuthService {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	getProfileCls() {
		return this.cls.get("account");
	}

	signTokens(accountId: string): TokenResponse {
		const accessToken = jwt.sign({}, Env.AT_SECRET, {
			subject: accountId,
			issuer: Env.APP_DOMAIN,
			expiresIn: Env.AT_EXPIRES_IN,
		});

		return { accessToken };
	}

	verifyAccessToken(token: string) {
		const data = jwt.verify(token, Env.AT_SECRET, {
			issuer: Env.APP_DOMAIN,
		});
		return typeof data == "string" ? null : data.sub;
	}

	async login(dto: LoginRequest) {
		switch (dto.scheme) {
			case AuthSchemeEnum.BASIC:
				return this.basicLogin(dto);
			case AuthSchemeEnum.OAUTH2:
				return this.oauth2Login(dto);
		}
	}

	async basicLogin(dto: LoginRequest) {
		const [username, password] = Buffer.from(dto.code, "base64")
			.toString()
			.split(":");
		if (!(username && password)) throw new WrongUsernameOrPasswordError();
		const account = await AccountModel.findOne({ email: username });
		if (!account) throw new WrongUsernameOrPasswordError();
		if (!bcrypt.compareSync(password, account.password))
			throw new WrongUsernameOrPasswordError();
		return this.signTokens(account.id);
	}

	async oauth2Login(dto: LoginRequest) {}
}
