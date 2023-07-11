/* eslint-disable @typescript-eslint/unbound-method */
import bcrypt from "bcrypt";
import { mock, MockProxy } from "jest-mock-extended";

import { UserCreator } from "../../../src/Users/application/UserCreator";
import { User } from "../../../src/Users/domain/User";
import { UserEmail } from "../../../src/Users/domain/UserEmail";
import { UserEmailNotValid } from "../../../src/Users/domain/UserEmailNotValid";
import { UserId } from "../../../src/Users/domain/UserId";
import { UserName } from "../../../src/Users/domain/UserName";
import { UserNameLengthExceeded } from "../../../src/Users/domain/UserNameLengthExceeded";
import { UserPassword } from "../../../src/Users/domain/UserPassword";
import { UserPasswordNotValid } from "../../../src/Users/domain/UserPasswordNotValid";
import { UserRepository } from "../../../src/Users/domain/UserRepository";

jest.mock("bcrypt", () => ({
	hashSync: jest.fn(() => "hashedPassword"),
	compare: jest.fn(),
}));

describe("UserCreator", () => {
	let repository: MockProxy<UserRepository> & UserRepository;
	let userCreator: UserCreator;

	beforeEach(() => {
		repository = mock<UserRepository>();
		userCreator = new UserCreator(repository);
	});

	it("should create a user correctly", async () => {
		const request = {
			id: "1",
			name: "Test",
			email: "test@example.com",
			password: "password",
		};

		const expectedUser = new User(
			new UserId(request.id),
			new UserName(request.name),
			new UserEmail(request.email),
			new UserPassword(request.password)
		);

		await userCreator.run(request);

		expect(repository.create).toBeCalledWith(expectedUser);
	});
	it("should throw error when username is longer than 15 characters", async () => {
		const request = {
			id: "1",
			name: "ThisIsATestUserNameThatIsLongerThan15Characters",
			email: "test@example.com",
			password: "password",
		};

		await expect(userCreator.run(request)).rejects.toThrow();
	});
	it("should throw an error when the user name length is more than 15 characters", async () => {
		const request = {
			id: "1",
			name: "ThisNameIsWayTooLong",
			email: "test@example.com",
			password: "password",
		};

		await expect(userCreator.run(request)).rejects.toThrow(UserNameLengthExceeded);
	});

	it("should throw an error when the user email is not valid", async () => {
		const request = {
			id: "1",
			name: "Test",
			email: "not a valid email",
			password: "password",
		};

		await expect(userCreator.run(request)).rejects.toThrow(UserEmailNotValid);
	});

	it("should throw an error when the user password is not valid", async () => {
		const request = {
			id: "1",
			name: "Test",
			email: "test@example.com",
			password: "pw",
		};

		await expect(userCreator.run(request)).rejects.toThrow(UserPasswordNotValid);
	});

	it("should generate a UUID for a new user", async () => {
		const request = {
			id: "",
			name: "Test",
			email: "test@example.com",
			password: "password",
		};

		await userCreator.run(request);

		expect(repository.create).toHaveBeenCalledWith(
			expect.objectContaining({
				id: expect.any(UserId),
			})
		);
	});

	it("should encrypt the password of a new user", async () => {
		const request = {
			id: "1",
			name: "Test",
			email: "test@example.com",
			password: "password",
		};

		const hashSyncSpy = jest.spyOn(bcrypt, "hashSync");

		await userCreator.run(request);

		expect(repository.create).toHaveBeenCalled();

		const userCreationCall = repository.create.mock.calls[0];
		const createdUser = userCreationCall[0];
		if (!createdUser.password) {
			throw new Error("Password not defined for user");
		}
		const hashedPassword = hashSyncSpy.mock.results[0].value; 

		expect(createdUser.password.value).toBe(hashedPassword);
	});

	it("should create an anonymous user when name is not provided", async () => {
		const request = {
			id: "1",
			name: "",
			email: "test@example.com",
			password: "password",
		};

		await userCreator.run(request);

		expect(repository.create).toHaveBeenCalledWith(
			expect.objectContaining({
				name: expect.any(UserName),
			})
		);
	});
});
