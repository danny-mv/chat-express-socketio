import { Request, Response } from "express";
import { Server } from "socket.io";

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
		private readonly httpResponse: HttpResponse,
		private readonly io: Server
	) {}

	async run(req: MessagePostRequest, res: Response): Promise<void> {
		try {
			const currentUserId = req.user?.id;
			if (!currentUserId) {
				throw new Error("there is no user");
			}
			const { message, conversationId } = req.body;
			const data = await this.messageCreator.run({
				body: message,
				sender: currentUserId,
				conversationId,
			});

			this.io.to(conversationId as string).emit("messages:new", data.getData());
			this.httpResponse.Created(res, "Message created");
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
