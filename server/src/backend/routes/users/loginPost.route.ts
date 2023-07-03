import { Request, Response, Router } from "express";

import { User } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserGetter } from "../../../Users/application/UserGetter";
import { SequelizeUserRepository } from "../../../Users/infrastructure/persistences/sequelize/SequelizeUserRepository";
import { LoginPostController } from "../../controllers/users/LoginPostController";
/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login user
 *     description: Returns a single user
 *     requestBody:
 *       description: User's login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSuccess'
 *       400:
 *         description: Invalid login credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseBadRequest'
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseServerError'
 */
export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeUserRepository = new SequelizeUserRepository(User);
	const userGetter = new UserGetter(sequelizeUserRepository);
	const httpResponse = new HttpResponse();
	const userCtrl = new LoginPostController(userGetter, httpResponse);
	router.post(
		"/login",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await userCtrl.run(req, res)
	);
};
