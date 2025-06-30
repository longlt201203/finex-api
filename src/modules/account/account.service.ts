import { Injectable } from "@nestjs/common";
import { CreateAccountRequest } from "./dto";
import { AccountModel } from "@db/models";
import * as bcrypt from "bcryptjs";
import { ValidationError } from "class-validator";
import { ApiValidationError } from "@errors";
import { UpdateAccountRequest } from "./dto/update-account.request";

@Injectable()
export class AccountService {
	async validateBeforeCreate(dto: CreateAccountRequest) {
		const errors: ValidationError[] = [];
		const [emailExisted, phoneExisted] = await Promise.all([
			AccountModel.exists({ email: dto.email }),
			AccountModel.exists({ phone: dto.phone }),
		]);

		if (emailExisted) {
			errors.push({
				property: "email",
				constraints: {
					unique: "Email already existed",
				},
			});
		}

		if (phoneExisted) {
			errors.push({
				property: "phone",
				constraints: {
					unique: "Phone already existed",
				},
			});
		}

		if (errors.length > 0) {
			throw new ApiValidationError(errors);
		}
	}

	async createAccount(dto: CreateAccountRequest) {
		await this.validateBeforeCreate(dto);
		const account = new AccountModel({
			email: dto.email,
			password: bcrypt.hashSync(dto.password, 10),
			fname: dto.fname,
			lname: dto.lname,
			phone: dto.phone,
			avt: dto.avt,
			role: dto.role,
		});
		await account.save();
	}

	async getAccounts() {
		return AccountModel.find();
	}

	async getAccountById(id: string) {
		return AccountModel.findById(id);
	}

	async updateAccount(id: string, dto: UpdateAccountRequest) {
		await this.validateBeforeCreate(dto);
		return AccountModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async deleteAccount(id: string) {
		return AccountModel.findByIdAndDelete(id);
	}
}
