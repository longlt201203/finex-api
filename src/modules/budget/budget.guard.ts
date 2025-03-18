import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { BudgetService } from "./budget.service";
import { BudgetNotFoundError } from "./errors";
import { ClsService } from "nestjs-cls";
import { FinexClsStore } from "@utils";
import { BudgetResponse } from "./dto";

@Injectable()
export class BudgetGuard implements CanActivate {
	constructor(
		private readonly budgetService: BudgetService,
		private readonly cls: ClsService<FinexClsStore>,
	) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest<Request>();
		const { budgetId } = req.params;
		if (!budgetId) throw new BudgetNotFoundError();
		const budget = await this.budgetService.findOne(budgetId);
		const accountId = this.cls.get("account.id");
		if (budget.account._id.toString() != accountId)
			throw new BudgetNotFoundError();
		this.cls.set("budget", BudgetResponse.fromDocument(budget));
		return true;
	}
}
