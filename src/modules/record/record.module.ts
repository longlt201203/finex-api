import { Module } from "@nestjs/common";
import { RecordService } from "./record.service";
import { RecordController } from "./record.controller";

@Module({
	providers: [RecordService],
	exports: [RecordService],
	controllers: [RecordController],
})
export class RecordModule {}
