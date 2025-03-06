import { Injectable, OnModuleInit } from "@nestjs/common";
import {
	CreateCategoryRequest,
	UpdateCategoryRequest,
	CategoryQuery,
} from "./dto";
import * as fs from "fs";
import * as path from "path";
import { CategoryModel } from "@db/models";

@Injectable()
export class CategoryService implements OnModuleInit {
	async onModuleInit() {
		const category = await CategoryModel.findOne();
		if (category) return;
		const data = fs.readFileSync("data/categories.json").toString();
		await CategoryModel.bulkSave(
			JSON.parse(data).map((item) => new CategoryModel(item)),
		);
	}

	async createOne(dto: CreateCategoryRequest) {}

	async updateOne(id: string | number, dto: UpdateCategoryRequest) {}

	async findMany(query: CategoryQuery) {
		return await CategoryModel.find();
	}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}
