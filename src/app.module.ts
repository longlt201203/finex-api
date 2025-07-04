import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
import { AccountModule } from "@modules/account";
import { AuthGuard, AuthModule } from "@modules/auth";
import { ClsModule } from "nestjs-cls";
import { BoardModule } from "@modules/board";
import { BudgetModule } from "@modules/budget";
import { RecordModule } from "@modules/record";
import { AnalysisModule } from "@modules/analysis";
import { CategoryModule } from "@modules/category";
import { ChatModule } from "@modules/chat";
import { SubscriptionModule } from "@modules/subscription";
import { UserSubscriptionModule } from "@modules/user-subscription";
import { AdminModule } from "@modules/admin";
import { ChartModule } from "@modules/chart";

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
		BudgetModule,
		RecordModule,
		CategoryModule,
		AnalysisModule,
		ChatModule,
		SubscriptionModule,
		UserSubscriptionModule,
		AdminModule,
		ChartModule,
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
