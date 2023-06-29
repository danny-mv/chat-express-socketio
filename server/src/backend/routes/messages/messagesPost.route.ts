import { Request, Response, Router } from "express";

import { MessageCreator } from "../../../Messages/application/MessageCreator";
import { SequelizeMessageRepository } from "../../../Messages/infrastructure/SequelizeMessageRepository";
import { Message } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { MessagesPostController } from "../../controllers/messages/MessagesPostController";
import { authenticateMiddleware } from "..";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeMessageRepository = new SequelizeMessageRepository(Message);
	const messageCreator = new MessageCreator(sequelizeMessageRepository);
	const httpResponse = new HttpResponse();
	const messageCtrl = new MessagesPostController(messageCreator, httpResponse);
	router.post(
		"/messages",
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		authenticateMiddleware,
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await messageCtrl.run(req, res)
	);
};
