import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";
import { UserName } from "../domain/UserName";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";
import { UserCreatorRequest } from "./request/UserCreatorRequest";

export class UserCreator {
	constructor(private readonly repository: UserRepository) {}

	async run({ id, name, email, password }: UserCreatorRequest): Promise<void> {
		const user = new User(
			new UserId(id),
			new UserName(name),
			new UserEmail(email),
			new UserPassword(password)
		);
		await this.repository.create(user);
	}
}
