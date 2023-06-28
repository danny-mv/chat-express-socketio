import { Request, Response, Router } from "express";

import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserList } from "../../../Users/application/UserList";
import { SequelizeUserRepository } from "../../../Users/infrastructure/persistences/sequelize/SequelizeUserRepository";
import { UserListGetController } from "../../controllers/users/UserListGetController";
import { authenticateMiddleware } from "..";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeUserRepository = new SequelizeUserRepository(sequelize);
	const userList = new UserList(sequelizeUserRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new UserListGetController(userList, httpResponse);
	router.get(
		"/list",
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		authenticateMiddleware,
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
