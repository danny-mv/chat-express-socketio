import { Request, Response, Router } from "express";

import { User } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserCreator } from "../../../Users/application/UserCreator";
import { SequelizeUserRepository } from "../../../Users/infrastructure/persistences/sequelize/SequelizeUserRepository";
import { RegisterPostController } from "../../controllers/users/RegisterPostController";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeUserRepository = new SequelizeUserRepository(User);
	const playerCreator = new UserCreator(sequelizeUserRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new RegisterPostController(playerCreator, httpResponse);
	router.post(
		"/register",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
