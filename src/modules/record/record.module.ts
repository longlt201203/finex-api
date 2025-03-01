import { Module } from "@nestjs/common";
import { RecordService } from "./record.service";
import { RecordController } from "./record.controller";
import { BoardModule } from "@modules/board";

@Module({
	providers: [RecordService],
	exports: [RecordService],
	controllers: [RecordController],
	imports: [BoardModule],
})
export class RecordModule {}
