import { StringValueObject } from "../../shared/domain/value-object/StringValueObject";
import { UserNameLengthExceeded } from "./UserNameLengthExceeded";

export class UserName extends StringValueObject {
	constructor(value: string) {
		let finalValue = value;
		if (value.length === 0) {
			finalValue = `anonym-${Math.floor(Math.random() * 1000)
				.toString()
				.padStart(4, "0")}`;
		}
		super(finalValue);

		this.ensureLengthIsLessThan15Characters(value);
	}

	private ensureLengthIsLessThan15Characters(value: string) {
		if (value.length > 15) {
			throw new UserNameLengthExceeded(`The Player name <${value}> has more than 15 characters`);
		}
	}
}
