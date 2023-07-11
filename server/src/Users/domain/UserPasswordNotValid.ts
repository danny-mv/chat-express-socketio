export class UserPasswordNotValid extends Error {
	constructor() {
		super(`The password is not valid. It should be at least 6 characters long.`);
	}
}
