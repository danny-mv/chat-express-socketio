import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Request, Response, Router } from "express";
import helmet from "helmet";
import * as http from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import swaggerUi from "swagger-ui-express";

import swaggerSetup from "../docs/swagger";
import { HttpResponse } from "../shared/infrastructure/response/HttpResponse";
import { registerRoutes } from "./routes";

export class Server {
	private readonly express: express.Express;
	private httpServer?: http.Server;
	private io?: SocketIoServer;

	constructor(private readonly port: string) {
		this.express = express();
		this.express.use(helmet());
		this.express.use(cors());
		this.express.use(json());
		this.express.use(urlencoded({ extended: true }));
		this.express.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
		this.initializeSocketIo();
		const router = Router();
		this.express.use(router);
		registerRoutes(router, this.io);
		router.use((err: Error, req: Request, res: Response, _next: () => void) => {
			// eslint-disable-next-line no-console
			console.log(err);
			new HttpResponse().Error(res, "Contact to an admin");
		});
		this.express.use((err: Error, req: Request, res: Response, _next: () => void) => {
			// eslint-disable-next-line no-console
			console.log(err);
			new HttpResponse().Error(res, "Server error");
		});
	}

	getIo(): SocketIoServer | undefined {
		return this.io;
	}

	async listen(): Promise<void> {
		await new Promise<void>((resolve) => {
			this.httpServer!.listen(this.port, () => {
				// eslint-disable-next-line no-console
				console.log(
					`✅ Backend App is running at http://localhost:${this.port} in ${this.express.get(
						"env"
					)} mode`
				);
				// eslint-disable-next-line no-console
				console.log("✋ Press CTRL-C to stop\n");

				resolve();
			});
		});
	}

	getHTTPServer(): Server["httpServer"] {
		return this.httpServer;
	}

	async stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.httpServer) {
				this.httpServer.close((error) => {
					if (error) {
						reject(error);

						return;
					}

					resolve();
				});
			}
		});
	}

	private initializeSocketIo(): void {
		this.httpServer = http.createServer(this.express); // Aquí se crea el servidor HTTP
		this.io = new SocketIoServer(this.httpServer, { cors: { origin: "http://localhost:3000" } }); // Aquí se crea el servidor Socket.IO
		this.configureSocketEvents();
	}

	private configureSocketEvents(): void {
		if (!this.io) {
			console.error("Error: Socket.io server is not initialized.");

			return;
		}

		this.io.on("connection", (socket: Socket) => {
			console.log("a user connected");
			socket.on("join", (conversationId: string) => {
				socket.join(conversationId);
			});
			socket.on("messages:new", (message: { id: string; body: string; ConversationId: string }) => {
				this.io!.to(message.ConversationId).emit("messages:new", message);
				console.log("nuevo mensaje", message);
			});

			socket.on("disconnect", () => {
				console.log("user disconnected");
			});
		});
	}
}
