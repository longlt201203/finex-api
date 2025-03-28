import { AccountResponse } from "@modules/account/dto";
import { BoardResponse } from "@modules/board/dto";
import { BudgetResponse } from "@modules/budget/dto";
import { ClsStore } from "nestjs-cls";

export interface FinexClsStore extends ClsStore {
	account: AccountResponse;
	board: BoardResponse;
	budget: BudgetResponse;
}
