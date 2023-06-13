import { Response } from "express";

import { HttpStatus } from "../../domain/HttpStatus";

export class HttpResponse {
	Ok(res: Response, data?: unknown): Response {
		return res.status(HttpStatus.OK).json({
			status: HttpStatus.OK,
			statusMsg: "Success",
			data,
		});
	}

	Created(res: Response, data?: unknown): Response {
		return res.status(HttpStatus.CREATED).json({
			status: HttpStatus.OK,
			statusMsg: "Success",
			data,
		});
	}

	BadRequest(res: Response, data?: unknown): Response {
		return res.status(HttpStatus.BAD_REQUEST).json({
			status: HttpStatus.BAD_REQUEST,
			statusMsg: "Bad Request",
			error: data,
		});
	}

	NotFound(res: Response, data?: unknown): Response {
		return res.status(HttpStatus.NOT_FOUND).json({
			status: HttpStatus.NOT_FOUND,
			statusMsg: "Not Found",
			error: data,
		});
	}

	Unauthorized(res: Response, data?: unknown): Response {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			status: HttpStatus.UNAUTHORIZED,
			statusMsg: "Unauthorized",
			error: data,
		});
	}

	UnprocessableContent(res: Response, data?: unknown): Response {
		return res.status(HttpStatus.UNPROCESSABLE_CONTENT).json({
			status: HttpStatus.UNPROCESSABLE_CONTENT,
			statusMsg: "Unprocessable Content",
			error: data,
		});
	}

	Forbidden(res: Response, data?: unknown): Response {
		return res.status(HttpStatus.FORBIDDEN).json({
			status: HttpStatus.FORBIDDEN,
			statusMsg: "Forbidden",
			error: data,
		});
	}

	Error(res: Response, data?: unknown): Response {
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			statusMsg: "Internal server error",
			error: data,
		});
	}
}
