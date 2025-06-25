import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { AccountModel } from "@db/models";
import { InvalidTokenError } from "./errors";
import { AccountResponse } from "@modules/account/dto";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly cls: ClsService<FinexClsStore>,
	) {}

	async canActivate(context: ExecutionContext) {
		const skipAuth =
			Reflect.getMetadata("skip-auth", context.getHandler()) ||
			Reflect.getMetadata("skip-auth", context.getClass());
		if (skipAuth) {
			return true;
		}
		const req = context.switchToHttp().getRequest<Request>();
		const token = this.getTokenFromRequest(req);
		if (!token) throw new InvalidTokenError();
		const accountId = this.authService.verifyAccessToken(token);
		if (!accountId) throw new InvalidTokenError();
		const account = await AccountModel.findById(accountId);
		this.cls.set("account", AccountResponse.fromDocument(account));
		return true;
	}

	getTokenFromRequest(request: Request) {
		return this.getTokenFromHeader(request) || this.getTokenFromCookie(request);
	}

	getTokenFromHeader(request: Request) {
		const authorization = request.headers.authorization;
		if (!authorization || !authorization.startsWith("Bearer ")) return null;
		return authorization.split(" ")[1];
	}

	getTokenFromCookie(request: Request) {
		return request.cookies["accessToken"];
	}
}
