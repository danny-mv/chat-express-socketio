import { Request, Response } from "express";

import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserCreator } from "../../../Users/application/UserCreator";
import { Controller } from "../Controller";

type UserPostRequest = Request & {
	body: {
		id: string;
		name: string;
		email: string;
		password: string;
	};
};
export class UserPostController implements Controller {
	constructor(
		private readonly userCreator: UserCreator,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: UserPostRequest, res: Response): Promise<void> {
		try {
			const { id, name, email, password } = req.body;
			await this.userCreator.run({ id, name, email, password });
			this.httpResponse.Created(res, "User created");
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
