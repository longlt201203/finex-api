import { AccountResponse } from "@modules/account/dto";
import { ClsStore } from "nestjs-cls";

export interface FinexClsStore extends ClsStore {
	account: AccountResponse;
}
