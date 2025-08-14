import { Injectable, OnModuleInit } from "@nestjs/common";
import { AdsIncomeModel } from "@db/models";
import { AdsIncomeQueryParams } from "./dto/query";
import * as dayjs from "dayjs";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class AdminAdsIncomeService implements OnModuleInit {
	async onModuleInit() {
		const count = await AdsIncomeModel.estimatedDocumentCount();
		if (count > 0) return;
		// Try to seed from data/ads-income.json; if missing, generate some synthetic records
		const filePath = path.resolve("data/ads-income.json");
		if (fs.existsSync(filePath)) {
			const content = fs.readFileSync(filePath, "utf-8");
			const items = JSON.parse(content);
			if (Array.isArray(items) && items.length) {
				await AdsIncomeModel.insertMany(
					items.map((i) => ({
						source: i.source,
						amount: i.amount,
						currency: i.currency ?? "USD",
						date: new Date(i.date),
						status: i.status,
					})),
				);
				return;
			}
		}

		const sources = ["YouTube", "AdSense", "Meta Ads", "TikTok", "Affiliate"];
		const statuses = ["paid", "pending", "failed"] as const;
		const now = dayjs();
		const gen: any[] = [];
		for (let i = 0; i < 30; i++) {
			gen.push({
				source: sources[i % sources.length],
				amount: Math.round((50 + Math.random() * 450) * 100) / 100,
				currency: "USD",
				date: now.subtract(i, "day").toDate(),
				status: statuses[i % statuses.length],
			});
		}
		await AdsIncomeModel.insertMany(gen);
	}

	async findAll(query: AdsIncomeQueryParams) {
		const filter: any = {};
		if (query.source) filter.source = new RegExp(`^${query.source}$`, "i");
		if (query.status) filter.status = new RegExp(`^${query.status}$`, "i");
		if (query.from || query.to) {
			filter.date = {} as any;
			if (query.from) filter.date.$gte = dayjs(query.from).toDate();
			if (query.to) filter.date.$lte = dayjs(query.to).toDate();
		}
		return AdsIncomeModel.find(filter).sort({ date: -1 });
	}

	async summary(query: AdsIncomeQueryParams) {
		const filter: any = {};
		if (query.source) filter.source = new RegExp(`^${query.source}$`, "i");
		if (query.status) filter.status = new RegExp(`^${query.status}$`, "i");
		if (query.from || query.to) {
			filter.date = {} as any;
			if (query.from) filter.date.$gte = dayjs(query.from).toDate();
			if (query.to) filter.date.$lte = dayjs(query.to).toDate();
		}

		const records = await AdsIncomeModel.find(filter);
		const currency = records[0]?.currency ?? "USD";
		const total = records.reduce((s, r) => s + r.amount, 0);
		const paid = records
			.filter((r) => r.status === "paid")
			.reduce((s, r) => s + r.amount, 0);
		const pending = records
			.filter((r) => r.status === "pending")
			.reduce((s, r) => s + r.amount, 0);
		const failed = records
			.filter((r) => r.status === "failed")
			.reduce((s, r) => s + r.amount, 0);

		return { total, paid, pending, failed, currency };
	}
}
