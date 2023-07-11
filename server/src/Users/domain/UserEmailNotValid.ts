export class UserEmailNotValid extends Error {
	constructor(email: string) {
		super(`The email <${email}> is not a valid email`);
	}
}
