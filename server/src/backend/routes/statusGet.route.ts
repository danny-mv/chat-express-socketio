import { Router } from "express";

import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";
import StatusGetController from "../controllers/StatusGetController";
/**
 * Get track
 * @openapi
 * /status:
 *   get:
 *     tags:
 *       - Status
 *     description: Returns the server status
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Status server 🟢
 *       500:
 *         description: An unexpected error occurred
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "An unexpected error occurred."
 */
export const register = (router: Router): void => {
	const statusCtrl = new StatusGetController(new HttpResponse());

	router.get(`/status`, statusCtrl.run.bind(statusCtrl));
};
