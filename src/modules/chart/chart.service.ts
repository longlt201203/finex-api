import { Injectable } from "@nestjs/common";
import {
	GetCacQuery,
	GetChurnRateQuery,
	GetFreeToPremiumQuery,
	GetMonthlyRecurringRevenueQuery,
	GetRetentionRateQuery,
	GetWauQuery,
} from "./dto";

@Injectable()
export class ChartService {
	async getWau(query: GetWauQuery) {
		return Array.from(
			{ length: 7 },
			() => Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
		);
	}

	async getCac(query: GetCacQuery) {
		return Array.from(
			{ length: 12 },
			() => Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
		);
	}

	async getFreeToPremium(query: GetFreeToPremiumQuery) {
		return Array.from(
			{ length: 12 },
			() => Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
		);
	}

	async getRetentionRate(query: GetRetentionRateQuery) {
		return Array.from(
			{ length: 12 },
			() => Math.floor(Math.random() * (100 - 0 + 1)) + 0,
		);
	}

	async getMonthlyRecurringRevenue(query: GetMonthlyRecurringRevenueQuery) {
		return Array.from(
			{ length: 12 },
			() => Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
		);
	}

	async getChurnRate(query: GetChurnRateQuery) {
		return Array.from(
			{ length: 12 },
			() => Math.floor(Math.random() * (100 - 0 + 1)) + 0,
		);
	}
}
