import { Request, Response } from "express";

import { ConversationByUserIdFinder } from "../../../Conversations/application/ConversationByUserIdFinder";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { Controller } from "../Controller";

interface AuthenticatedRequest extends Request {
	user?: { id: string; email: string };
}

export class ConversationsGetController implements Controller {
	constructor(
		private readonly conversationByUserIdFinder: ConversationByUserIdFinder,
		private readonly httpResponse: HttpResponse
	) {}

	async run(req: AuthenticatedRequest, res: Response): Promise<void> {
		try {
			const currentUserId = req.user?.id;
			if (!currentUserId) {
				throw new Error("there is no user");
			}
			const data = await this.conversationByUserIdFinder.run(currentUserId);
			console.log(JSON.stringify(data), "controller");
			this.httpResponse.Ok(res, data);
		} catch (error) {
			console.log(error);
			this.httpResponse.Error(res, error);
		}
	}
}
