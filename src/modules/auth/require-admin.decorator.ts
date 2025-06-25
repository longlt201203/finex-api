import { UseGuards, applyDecorators } from "@nestjs/common";
import { AdminRoleGuard } from "./admin-role.guard";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function RequireAdmin() {
	return applyDecorators(
		UseGuards(AdminRoleGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({
			description: "Unauthorized - Admin role required",
		}),
	);
}
