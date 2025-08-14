import { ApiProperty } from "@nestjs/swagger";
import { FeedbackDocumentType, FeedbackStatusEnum } from "@db/models";
import { FeedbackReplyResponse } from "./reply";

export class FeedbackResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	userId: string;

	@ApiProperty()
	userName: string;

	@ApiProperty()
	type: string;

	@ApiProperty()
	title: string;

	@ApiProperty()
	content: string;

	@ApiProperty({ minimum: 1, maximum: 5 })
	rating: number;

	@ApiProperty()
	status: string;

	@ApiProperty({ type: () => [FeedbackReplyResponse] })
	replies: FeedbackReplyResponse[];

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	static fromDocument(d: FeedbackDocumentType): FeedbackResponse {
		return {
			id: d._id.toString(),
			userId: d.account.toString(),
			userName: (d as any).account?.fname
				? `${(d as any).account.fname} ${(d as any).account.lname ?? ""}`.trim()
				: undefined,
			type: d.type,
			title: d.title,
			content: d.content,
			rating: d.rating,
			status: FeedbackResponse.statusToHuman(d.status),
			replies: (d.replies || []).map((r: any) => ({
				id: r._id.toString(),
				userId: r.account.toString(),
				userName: r.account?.fname
					? `${r.account.fname} ${r.account.lname ?? ""}`.trim()
					: undefined,
				content: r.content,
				createdAt: r.createdAt,
				isAdmin: r.account?.role === 1,
			})),
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
		} as any;
	}

	static statusToHuman(s: FeedbackStatusEnum): string {
		switch (s) {
			case FeedbackStatusEnum.NEW:
				return "Open";
			case FeedbackStatusEnum.REVIEWING:
				return "In Progress";
			case FeedbackStatusEnum.RESOLVED:
				return "Resolved";
			case FeedbackStatusEnum.CLOSED:
				return "Closed";
			default:
				return String(s);
		}
	}

	static fromDocuments(docs: FeedbackDocumentType[]) {
		return docs.map(this.fromDocument);
	}
}
