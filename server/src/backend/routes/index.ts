import { NextFunction, Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import * as glob from "glob";
import { JwtPayload, verify } from "jsonwebtoken";
import * as path from "path";

import { HttpResponse } from "../../shared/infrastructure/response/HttpResponse";

export function registerRoutes(router: Router): void {
	const normalizedDirname = path.normalize(__dirname).replace(/\\/g, "/");
	const routes = glob.sync(`${normalizedDirname}/**/*.route.*`);
	routes.map((route) => register(route, router));
}

function register(routePath: string, router: Router) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
	const routeModule = require(routePath);
	if (typeof routeModule === "function") {
		routeModule(router);
	} else if (routeModule && typeof routeModule.register === "function") {
		routeModule.register(router);
	} else {
		console.error(`No register function found in module ${routePath}`);
	}
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function validateReqSchema(req: Request, res: Response, next: Function): Response {
	const validationErrors = validationResult(req);
	if (validationErrors.isEmpty()) {
		return next();
	}
	const errors = validationErrors.mapped();

	return new HttpResponse().UnprocessableContent(res, errors);
}
interface AuthenticatedRequest extends Request {
	user?: { email: string }; // Define la propiedad 'user' con el tipo adecuado
}
export function authenticateMiddleware(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): void {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		new HttpResponse().Unauthorized(res, "There is not any token");

		return;
	}

	try {
		const decoded = verify(token, process.env.SECRET ?? "") as JwtPayload & { email: string };

		req.user = { email: decoded.email };

		next();
	} catch (error) {
		new HttpResponse().Forbidden(res, "Invalid Token");
	}
}
