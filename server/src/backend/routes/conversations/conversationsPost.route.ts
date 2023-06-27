import { Request, Response, Router } from "express";

import { ConversationCreator } from "../../../conversations/application/ConversationCreator";
import { SequelizeConversationRepository } from "../../../conversations/infrastructure/SequelizeConversationRepository";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { RoomPostController } from "../../controllers/conversations/ConversationPostController";
import { authenticateMiddleware } from "..";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeConversationRepository = new SequelizeConversationRepository(sequelize);
	const roomCreator = new ConversationCreator(sequelizeConversationRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new RoomPostController(roomCreator, httpResponse);
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
