import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

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
			const accessToken = sign({ id: data.id, email }, process.env.SECRET ?? "", {
				expiresIn: "1h",
			});
			const responseData = {
				...data,
				accessToken,
			};
			this.httpResponse.Ok(res, responseData);
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
