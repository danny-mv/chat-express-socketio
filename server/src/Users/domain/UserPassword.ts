import bcrypt from "bcrypt";

import { StringValueObject } from "../../shared/domain/value-object/StringValueObject";

export class UserPassword extends StringValueObject {
	constructor(value: string, private readonly isHashed: boolean = false) {
		super(isHashed ? value : UserPassword.encrypt(value));
	}

	private static encrypt(value: string): string {
		return bcrypt.hashSync(value, 10);
	}

	public async compare(plainTextPassword: string): Promise<boolean> {
		return await bcrypt.compare(plainTextPassword, this.value);
	}
}
