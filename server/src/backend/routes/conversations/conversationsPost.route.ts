import { Request, Response, Router } from "express";

import { ConversationCreator } from "../../../Conversations/application/ConversationCreator";
import { SequelizeConversationRepository } from "../../../Conversations/infrastructure/SequelizeConversationRepository";
import {
	Conversation,
	User,
} from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { ConversationPostController } from "../../controllers/conversations/ConversationPostController";
import { authenticateMiddleware } from "..";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeConversationRepository = new SequelizeConversationRepository(Conversation, User);
	const roomCreator = new ConversationCreator(sequelizeConversationRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new ConversationPostController(roomCreator, httpResponse);
	router.post(
		"/conversation",
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		authenticateMiddleware,
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
