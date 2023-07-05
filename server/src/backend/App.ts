import "dotenv/config";

import { Server } from "./Server";

export class App {
	server?: Server;

	async start(): Promise<void> {
		const port = process.env.PORT ?? "8000";
		const frontUrl = process.env.FRONT_URL ?? "";
		this.server = new Server(port, frontUrl);

		await this.server.listen();
	}

	get httpServer(): Server["httpServer"] | undefined {
		return this.server?.getHTTPServer();
	}

	async stop(): Promise<void> {
		return await this.server?.stop();
	}
}
