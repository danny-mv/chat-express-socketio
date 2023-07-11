import { StringValueObject } from "../../shared/domain/value-object/StringValueObject";
import { UserEmailNotValid } from "./UserEmailNotValid";

export class UserEmail extends StringValueObject {
	constructor(value: string) {
		super(value);

		this.ensureEmailIsValid(value);
	}

	private ensureEmailIsValid(value: string) {
		const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

		if (!emailPattern.test(value)) {
			throw new UserEmailNotValid(value);
		}
	}
}
