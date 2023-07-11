/* eslint-disable @typescript-eslint/unbound-method */
import { mock, MockProxy } from "jest-mock-extended";

import { UserGetterRequest } from "../../../src/Users/application/request/UserGetterRequest";
import { UserGetter } from "../../../src/Users/application/UserGetter";
import { User } from "../../../src/Users/domain/User";
import { UserEmail } from "../../../src/Users/domain/UserEmail";
import { UserId } from "../../../src/Users/domain/UserId";
import { UserName } from "../../../src/Users/domain/UserName";
import { UserPassword } from "../../../src/Users/domain/UserPassword";
import { UserRepository } from "../../../src/Users/domain/UserRepository";

describe("UserGetter", () => {
	let repository: MockProxy<UserRepository> & UserRepository;
	let userGetter: UserGetter;

	beforeEach(() => {
		repository = mock<UserRepository>();
		userGetter = new UserGetter(repository);
	});

	it("should get a user correctly when email and password are valid", async () => {
		const request: UserGetterRequest = {
			email: "test@example.com",
			password: "password",
		};

		const user = new User(
			new UserId("1"),
			new UserName("Test"),
			new UserEmail(request.email),
			new UserPassword("hashedPassword", true)
		);

		repository.findByEmail.mockResolvedValue(user);
		user.password.compare = jest.fn().mockResolvedValue(true);

		const expectedResponse = {
			id: user.id.value,
			name: user.name.value,
		};

		const response = await userGetter.run(request);

		expect(response).toEqual(expectedResponse);
		expect(repository.findByEmail).toHaveBeenCalledWith(new UserEmail(request.email));
		expect(user.password.compare).toHaveBeenCalledWith(request.password);
	});

	it("should throw an error when email is not found in the repository", async () => {
		const request: UserGetterRequest = {
			email: "test@example.com",
			password: "password",
		};

		repository.findByEmail.mockResolvedValue(null);

		await expect(userGetter.run(request)).rejects.toThrow("Invalid Credentials");
		expect(repository.findByEmail).toHaveBeenCalledWith(new UserEmail(request.email));
	});

	it("should throw an error when the provided password is not valid", async () => {
		const request: UserGetterRequest = {
			email: "test@example.com",
			password: "password",
		};

		const user = new User(
			new UserId("1"),
			new UserName("Test"),
			new UserEmail(request.email),
			new UserPassword("hashedPassword", true)
		);

		repository.findByEmail.mockResolvedValue(user);
		user.password.compare = jest.fn().mockResolvedValue(false);

		await expect(userGetter.run(request)).rejects.toThrow("Invalid Credentials");
		expect(repository.findByEmail).toHaveBeenCalledWith(new UserEmail(request.email));
		expect(user.password.compare).toHaveBeenCalledWith(request.password);
	});
});
