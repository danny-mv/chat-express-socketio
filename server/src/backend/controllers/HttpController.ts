import { Request, Response } from "express";

import { HttpStatus } from "../../shared/domain/HttpStatus";

export abstract class HttpController<T, E = any> {
	protected abstract run(req: Request, res: Response): Promise<void> | void;
	public ok(res: Response, data?: T): Response {
		return res.status(HttpStatus.OK).json({
			status: HttpStatus.OK,
			statusMsg: "Success",
			data,
		});
	}

	error(res: Response, data?: E): Response {
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			statusMsg: "Internal server error",
			error: data,
		});
	}
}
