import { Request, Response, Router } from "express";

import { User } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserList } from "../../../Users/application/UserList";
import { SequelizeUserRepository } from "../../../Users/infrastructure/persistences/sequelize/SequelizeUserRepository";
import { UserListGetController } from "../../controllers/users/UserListGetController";
import { authenticateMiddleware } from "..";
/**
 * @openapi
 * /list:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Users
 *     description: Returns a list of users except the current logged in user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUnauthorized'
 *       500:
 *         description: An unexpected error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseServerError'
 */
export const register = (router: Router): void => {
	//const reqSchema = [body("name").exists().isString()];

	const sequelizeUserRepository = new SequelizeUserRepository(User);
	const userList = new UserList(sequelizeUserRepository);
	const httpResponse = new HttpResponse();
	const usersCtrl = new UserListGetController(userList, httpResponse);
	router.get(
		"/list",
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		authenticateMiddleware,
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await usersCtrl.run(req, res)
	);
};
