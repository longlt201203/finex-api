import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraintInterface,
} from "class-validator";
import { Types } from "mongoose";

export class IsObjectIdConstraint implements ValidatorConstraintInterface {
	validate(value: any, validationArguments?: ValidationArguments) {
		return typeof value === "string" && Types.ObjectId.isValid(value);
	}
}

export function IsObjectId(
	validationOptions?: ValidationOptions,
): PropertyDecorator {
	return (target, propertyKey: string) => {
		registerDecorator({
			name: "isObjectId",
			target: target.constructor,
			propertyName: propertyKey,
			constraints: [],
			options: validationOptions,
			validator: new IsObjectIdConstraint(),
		});
	};
}
