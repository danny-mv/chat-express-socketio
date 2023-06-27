import { Request, Response } from "express";

import { ConversationCreator } from "../../../conversations/application/ConversationCreator";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

interface AuthenticatedRequest extends Request {
	user?: { id: string };
}
type ConversationPostRequest = AuthenticatedRequest & {
	body: {
		userId: string;
		name: string;
	};
};

export class RoomPostController implements Controller {
	constructor(
		private readonly conversationCreator: ConversationCreator,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: ConversationPostRequest, res: Response): Promise<void> {
		try {
			const currentUserId = req.user?.id;
			const { userId, name } = req.body;
			const userIds = [currentUserId, userId];
			const data = await this.conversationCreator.run({ userIds, conversationName: name });
			this.httpResponse.Ok(res, data);
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
