import { Request, Response, Router } from "express";

import { ConversationByUserIdFinder } from "../../../Conversations/application/ConversationByUserIdFinder";
import { SequelizeConversationRepository } from "../../../Conversations/infrastructure/SequelizeConversationRepository";
import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { ConversationsGetController } from "../../controllers/conversations/ConversationsGetController";
import { authenticateMiddleware } from "..";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeConversationRepository = new SequelizeConversationRepository(sequelize);
	const useCase = new ConversationByUserIdFinder(sequelizeConversationRepository);
	const httpResponse = new HttpResponse();
	const conversationsCtrl = new ConversationsGetController(useCase, httpResponse);
	router.get(
		"/conversations",
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		authenticateMiddleware,
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await conversationsCtrl.run(req, res)
	);
};
