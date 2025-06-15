import { UserSubscriptionDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";
import { SubscriptionResponse } from "@modules/subscription/dto";

export class UserSubscriptionResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	accountId: string;

	@ApiProperty()
	subscriptionId: string;

	@ApiProperty({ type: SubscriptionResponse })
	subscription?: SubscriptionResponse;

	@ApiProperty({ type: Date })
	purchaseDate: Date;

	@ApiProperty({ type: Date })
	expiryDate: Date;

	@ApiProperty()
	active: boolean;

	@ApiProperty()
	paymentStatus: string;

	@ApiProperty({ type: Date })
	createdAt: Date;

	@ApiProperty({ type: Date })
	updatedAt: Date;

	static fromDocument(
		d: UserSubscriptionDocumentType,
		includeSubscription = false,
	): UserSubscriptionResponse {
		const response: UserSubscriptionResponse = {
			id: d._id.toString(),
			accountId: d.account._id
				? d.account._id.toString()
				: d.account.toString(),
			subscriptionId: d.subscription._id
				? d.subscription._id.toString()
				: d.subscription.toString(),
			purchaseDate: d.purchaseDate,
			expiryDate: d.expiryDate,
			active: d.active,
			paymentStatus: d.paymentStatus,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
		};

		// If subscription is populated and we want to include it
		if (
			includeSubscription &&
			d.subscription._id &&
			typeof d.subscription !== "string"
		) {
			const subscriptionDoc = d.subscription as any;
			response.subscription = {
				id: subscriptionDoc._id.toString(),
				name: subscriptionDoc.name,
				price: subscriptionDoc.price,
				currencyUnit: subscriptionDoc.currencyUnit,
				startDate: subscriptionDoc.startDate,
				endDate: subscriptionDoc.endDate,
				active: subscriptionDoc.active,
				description: subscriptionDoc.description,
				createdAt: subscriptionDoc.createdAt,
				updatedAt: subscriptionDoc.updatedAt,
			};
		}

		return response;
	}

	static fromDocuments(
		docs: UserSubscriptionDocumentType[],
		includeSubscription = false,
	): UserSubscriptionResponse[] {
		return docs.map((d) => this.fromDocument(d, includeSubscription));
	}
}
