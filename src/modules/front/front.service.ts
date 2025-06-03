import { Injectable, OnModuleInit } from "@nestjs/common";
import * as AdmZip from "adm-zip";
import * as fs from "fs";

@Injectable()
export class FrontService implements OnModuleInit {
	onModuleInit() {
		if (!fs.existsSync("public")) {
			fs.mkdirSync("public");
		}
	}

	async deploy(file: Express.Multer.File) {
		const zip = new AdmZip(file.buffer);
		fs.rmdirSync("public", { recursive: true });
		fs.mkdirSync("public");
		zip.extractAllTo("public", true);
	}
}
