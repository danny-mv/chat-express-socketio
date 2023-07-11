import { mock, MockProxy } from "jest-mock-extended";

import { UserListRequest } from "../../../src/Users/application/request/UserListRequest";
import { UserList } from "../../../src/Users/application/UserList";
import { User } from "../../../src/Users/domain/User";
import { UserEmail } from "../../../src/Users/domain/UserEmail";
import { UserRepository } from "../../../src/Users/domain/UserRepository";

describe("UserList", () => {
	let repository: MockProxy<UserRepository>;
	let userList: UserList;

	beforeEach(() => {
		repository = mock<UserRepository>();
		userList = new UserList(repository);
	});

	it("should return list of users except the provided email", async () => {
		// Arrange
		const email = "test@example.com";
		const request: UserListRequest = { email };
		const usersData = [
			{
				id: "1",
				name: "User 1",
				email: "user1@example.com",
				password: "password1",
			},
			{
				id: "2",
				name: "User 2",
				email, // Provided email, should be excluded
				password: "password2",
			},
			{
				id: "3",
				name: "User 3",
				email: "user3@example.com",
				password: "password3",
			},
		];
		const users = usersData.map((user) => User.fromPrimitives(user));
		repository.findAllExceptUser.mockResolvedValue(
			users.filter((user) => user.email.value !== email)
		);

		// Act
		const result = await userList.run(request);

		// Assert
		expect(result).toHaveLength(2);
		expect(result).toContainEqual({
			conversationIds: [],
			id: "1",
			name: "User 1",
			email: "user1@example.com",
			messageIds: [],
		});
		expect(result).toContainEqual({
			id: "3",
			name: "User 3",
			email: "user3@example.com",
			messageIds: [],
			conversationIds: [],
		});
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.findAllExceptUser).toHaveBeenCalledWith(expect.any(UserEmail));
	});
});
