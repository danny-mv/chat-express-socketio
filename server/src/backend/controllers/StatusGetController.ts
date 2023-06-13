import { Request, Response } from "express";

import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import { Controller } from "./Controller";

export default class StatusGetController implements Controller {
	constructor(private readonly httpResponse: HttpResponse) {}

	run(req: Request, res: Response): void {
		try {
			this.httpResponse.Ok(res, "Status server: 🟢");
		} catch (error) {
			if (error instanceof Error) {
				this.httpResponse.Error(res, { message: error.message });
			} else {
				this.httpResponse.Error(res, { message: "An unexpected error occurred." });
			}
		}
	}
}
