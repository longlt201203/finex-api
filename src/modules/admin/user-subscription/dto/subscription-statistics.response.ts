import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionStatisticsResponse {
	@ApiProperty()
	totalSubscriptions: number;

	@ApiProperty()
	activeSubscriptions: number;

	@ApiProperty()
	expiredSubscriptions: number;

	@ApiProperty()
	expiringSubscriptions: number;

	static fromData(data: any): SubscriptionStatisticsResponse {
		const response = new SubscriptionStatisticsResponse();
		response.totalSubscriptions = data.totalSubscriptions;
		response.activeSubscriptions = data.activeSubscriptions;
		response.expiredSubscriptions = data.expiredSubscriptions;
		response.expiringSubscriptions = data.expiringSubscriptions;
		return response;
	}
}
