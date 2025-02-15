import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
import { AccountModule } from "@modules/account";
import { AuthGuard, AuthModule } from "@modules/auth";
import { ClsModule } from "nestjs-cls";
import { BoardModule } from "@modules/board";
import { RecordModule } from "@modules/record";
import { AnalysisModule } from "@modules/analysis";
import { CategoryModule } from "@modules/category";

@Module({
	imports: [
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
			},
		}),
		AccountModule,
		AuthModule,
		BoardModule,
		RecordModule,
		CategoryModule,
		AnalysisModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
