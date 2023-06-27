import { Request, Response } from "express";

import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserList } from "../../../Users/application/UserList";
import { Controller } from "../Controller";

interface AuthenticatedRequest extends Request {
	user?: { email: string };
}
export class UserListPostController implements Controller {
	constructor(private readonly userList: UserList, private readonly httpResponse: HttpResponse) {}

	async run(req: AuthenticatedRequest, res: Response): Promise<void> {
		try {
			const email = req.user?.email;
			if (!email) {
				this.httpResponse.Unauthorized(res, "No valid credentials");

				return;
			}
			const data = await this.userList.run({ email });
			this.httpResponse.Ok(res, data);
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
