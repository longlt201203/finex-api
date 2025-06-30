import { Injectable } from "@nestjs/common";
import { GetCacQuery, GetFreeToPremiumQuery, GetWauQuery } from "./dto";

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
}
