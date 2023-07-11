import { UserEmail } from "../domain/UserEmail";
import { UserRepository } from "../domain/UserRepository";
import { UserGetterRequest } from "./request/UserGetterRequest";
import { UserGetterResponse } from "./response/UserGetterResponse";

export class UserGetter {
	constructor(private readonly repository: UserRepository) {}

	async run({ email, password }: UserGetterRequest): Promise<UserGetterResponse> {
		const user = await this.repository.findByEmail(new UserEmail(email));
		if (!user) {
			throw new Error("Invalid Credentials");
		}

		const isValidPassword = await user.password.compare(password);
		if (!isValidPassword) {
			throw new Error("Invalid Credentials");
		}

		return { id: user.id.value, name: user.name.value };
	}
}
