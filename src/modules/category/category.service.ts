import { Injectable } from "@nestjs/common";
import {
	CreateCategoryRequest,
	UpdateCategoryRequest,
	CategoryQuery,
} from "./dto";

@Injectable()
export class CategoryService {
	async createOne(dto: CreateCategoryRequest) {}

	async updateOne(id: string | number, dto: UpdateCategoryRequest) {}

	async findMany(query: CategoryQuery) {}

	async findOne(id: string | number) {}

	async deleteOne(id: string | number) {}
}
