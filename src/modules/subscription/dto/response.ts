import { SubscriptionDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	price: number;

	@ApiProperty()
	currencyUnit: string;

	@ApiProperty({ type: Date })
	startDate: Date;

	@ApiProperty({ type: Date })
	endDate: Date;

	@ApiProperty()
	active: boolean;

	@ApiProperty({ required: false })
	description?: string;

	@ApiProperty({ type: Date })
	createdAt: Date;

	@ApiProperty({ type: Date })
	updatedAt: Date;

	static fromDocument(d: SubscriptionDocumentType): SubscriptionResponse {
		return {
			id: d._id.toString(),
			name: d.name,
			price: d.price,
			currencyUnit: d.currencyUnit,
			startDate: d.startDate,
			endDate: d.endDate,
			active: d.active,
			description: d.description,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
		};
	}

	static fromDocuments(
		docs: SubscriptionDocumentType[],
	): SubscriptionResponse[] {
		return docs.map((d) => this.fromDocument(d));
	}
}
