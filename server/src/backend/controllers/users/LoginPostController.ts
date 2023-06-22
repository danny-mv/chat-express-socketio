import { Request, Response } from "express";

import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserGetter } from "../../../Users/application/UserGetter";
import { Controller } from "../Controller";

type LoginPostRequest = Request & {
	body: {
		email: string;
		password: string;
	};
};
export class LoginPostController implements Controller {
	constructor(
		private readonly userGetter: UserGetter,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: LoginPostRequest, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			const data = await this.userGetter.run({ email, password });
			this.httpResponse.Ok(res, data);
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
