import { Request, Response } from "express";

import { ConversationCreator } from "../../../conversations/application/ConversationCreator";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

type ConversationPostRequest = Request & {
	body: {
		userId: string;
		roomName: string;
	};
};

export class RoomPostController implements Controller {
	constructor(
		private readonly conversationCreator: ConversationCreator,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: ConversationPostRequest, res: Response): Promise<void> {
		try {
			const { userId, conversationName } = req.body;
			const data = await this.conversationCreator.run({ userId, conversationName });
			this.httpResponse.Ok(res, data);
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
