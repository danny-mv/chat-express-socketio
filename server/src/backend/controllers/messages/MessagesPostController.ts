import { Request, Response } from "express";

import { MessageCreator } from "../../../Messages/application/MessageCreator";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

interface AuthenticatedRequest extends Request {
	user?: { id: string; email: string };
}
type MessagePostRequest = AuthenticatedRequest & {
	body: {
		message: string;
		conversationId: string;
	};
};

export class MessagesPostController implements Controller {
	constructor(
		private readonly messageCreator: MessageCreator,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: MessagePostRequest, res: Response): Promise<void> {
		try {
			const currentUserId = req.user?.id;
			if (!currentUserId) {
				throw new Error("there is no user");
			}
			console.log(currentUserId, "id");
			const { message, conversationId } = req.body;
			await this.messageCreator.run({ body: message, sender: currentUserId, conversationId });
			this.httpResponse.Created(res, "data");
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
