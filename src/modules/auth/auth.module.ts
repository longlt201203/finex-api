import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminRoleGuard } from "./admin-role.guard";

@Module({
	providers: [AuthService, AdminRoleGuard],
	exports: [AuthService, AdminRoleGuard],
	controllers: [AuthController],
})
export class AuthModule {}
