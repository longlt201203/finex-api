import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { AccountRoleEnum } from "@utils";
import { UnauthorizedError } from "./errors/unauthorized.error";

@Injectable()
export class AdminRoleGuard implements CanActivate {
	constructor(private readonly cls: ClsService<FinexClsStore>) {}

	canActivate(context: ExecutionContext): boolean {
		const account = this.cls.get("account");

		if (!account || account.role !== AccountRoleEnum.ADMIN) {
			throw new UnauthorizedError();
		}

		return true;
	}
}
