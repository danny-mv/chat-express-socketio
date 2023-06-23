import { Request, Response, Router } from "express";

import { sequelize } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserGetter } from "../../../Users/application/UserGetter";
import { SequelizeUserRepository } from "../../../Users/infrastructure/persistences/sequelize/SequelizeUserRepository";
import { LoginPostController } from "../../controllers/users/LoginPostController";

export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeUserRepository = new SequelizeUserRepository(sequelize);
	const roomCreator = new RoomCreator(sequelizeUserRepository);
	const httpResponse = new HttpResponse();
	const playersCtrl = new RoomPostController(roomCreator, httpResponse);
	router.post(
		"/room",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await playersCtrl.run(req, res)
	);
};
