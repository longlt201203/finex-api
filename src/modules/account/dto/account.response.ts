import { AccountDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class AccountResponse {
	@ApiProperty()
	_id: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	fname: string;

	@ApiProperty()
	lname: string;

	@ApiProperty()
	phone: string;

	@ApiProperty({ required: false })
	avt?: string;

	@ApiProperty()
	role: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	static fromDocument(d: AccountDocumentType): AccountResponse {
		return {
			_id: d._id.toString(),
			email: d.email,
			fname: d.fname,
			lname: d.lname,
			phone: d.phone,
			avt: d.avt,
			role: d.role,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
		};
	}

	static fromDocuments(docs: AccountDocumentType[]): AccountResponse[] {
		return docs.map(this.fromDocument);
	}
}
