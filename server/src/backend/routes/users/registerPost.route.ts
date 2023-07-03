import { Request, Response, Router } from "express";

import { User } from "../../../shared/infrastructure/persistence/config/sequelize.config";
import { HttpResponse } from "../../../shared/infrastructure/response/HttpResponse";
import { UserCreator } from "../../../Users/application/UserCreator";
import { SequelizeUserRepository } from "../../../Users/infrastructure/persistences/sequelize/SequelizeUserRepository";
import { RegisterPostController } from "../../controllers/users/RegisterPostController";
/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     description: Registers a new user
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - email
 *               - password
 *             properties:
 *               id:
 *                 type: string
 *                 description: The id of the new user
 *               name:
 *                 type: string
 *                 description: The name of the new user
 *               email:
 *                 type: string
 *                 description: The email of the new user
 *               password:
 *                 type: string
 *                 description: The password of the new user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSuccess'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseBadRequest'
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
	const playerCreator = new UserCreator(sequelizeUserRepository);
	const httpResponse = new HttpResponse();
	const userCtrl = new RegisterPostController(playerCreator, httpResponse);
	router.post(
		"/register",
		//checkExact(reqSchema),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		//validateReqSchema,
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		async (req: Request, res: Response) => await userCtrl.run(req, res)
	);
};
