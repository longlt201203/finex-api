import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraintInterface,
} from "class-validator";
import * as dayjs from "dayjs";

export class IsDayjsStringConstraint implements ValidatorConstraintInterface {
	validate(value: any, args?: ValidationArguments) {
		if (typeof value !== "string") return false;

		const [format] = args?.constraints || [];
		if (format) {
			// Validate the date against the provided format
			return dayjs(value, format, true).isValid();
		}

		// Default validation: check if it's a valid Day.js date
		return dayjs(value).isValid();
	}

	defaultMessage(args?: ValidationArguments) {
		const [format] = args?.constraints || [];
		return format
			? `The value ($value) is not a valid date in the format "${format}".`
			: `The value ($value) is not a valid date string.`;
	}
}

export function IsDayjsString(
	format?: string,
	validationOptions?: ValidationOptions,
): PropertyDecorator {
	return (target, propertyKey: string) => {
		registerDecorator({
			name: "isDayjsString",
			target: target.constructor,
			propertyName: propertyKey,
			constraints: [format],
			options: validationOptions,
			validator: IsDayjsStringConstraint,
		});
	};
}
