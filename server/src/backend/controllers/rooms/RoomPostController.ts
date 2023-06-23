import { Request, Response } from "express";

import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

type RoomPostRequest = Request & {
	body: {
		userId: string;
		roomName: string;
	};
};

export class RoomPostController implements Controller {
	constructor(
		private readonly roomCreator: RoomCreator,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: RoomPostRequest, res: Response): Promise<void> {
		try {
			const { userId, roomName } = req.body;
			const data = await this.roomCreator.run({ userId, roomName });
			this.httpResponse.Ok(res, data);
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
