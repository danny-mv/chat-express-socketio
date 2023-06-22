import { UserEmail } from "../domain/UserEmail";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";
import { UserGetterRequest } from "./request/UserGetterRequest";
import { UserGetterResponse } from "./response/UserGetterResponse";

export class UserGetter {
	constructor(private readonly repository: UserRepository) {}

	async run({ email, password }: UserGetterRequest): Promise<UserGetterResponse> {
		const user = await this.repository.findByEmail(new UserEmail(email));
		if (!user) {
			throw new Error("Invalid Credentials n ");
		}
		//Falta encriptado de la pass
		if (user.password.value !== password) {
			throw new Error("Invalid Credentials p ");
		}

		return { id: user.id.value, name: user.name.value };
	}
}
