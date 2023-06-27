import { UserEmail } from "../domain/UserEmail";
import { UserRepository } from "../domain/UserRepository";
import { UserListRequest } from "./request/UserListRequest";
import { UserListResponse } from "./response/UserListResponse";

export class UserList {
	constructor(private readonly repository: UserRepository) {}

	async run({ email }: UserListRequest): Promise<UserListResponse[]> {
		const users = await this.repository.findAllExceptUser(new UserEmail(email));
		const response = users.map((user) => {
			const { password, ...userPrimitives } = user.toPrimitives();

			return userPrimitives;
		});

		return response;
	}
}
