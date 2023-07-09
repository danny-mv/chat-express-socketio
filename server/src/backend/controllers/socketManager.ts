import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";

import { MessageCreator } from "../../Messages/application/MessageCreator";
import { SequelizeMessageRepository } from "../../Messages/infrastructure/SequelizeMessageRepository";
import { Message, User } from "../../shared/infrastructure/persistence/config/sequelize.config";

function socketEventsHandler(socket: Socket, io: SocketIoServer) {
	const messageSequelize = new SequelizeMessageRepository(Message, User);
	const messageCreator = new MessageCreator(messageSequelize);
	console.log("a user connected");

	socket.on("join", (conversationId: string) => {
		socket.join(conversationId);
	});

	socket.on(
		"message:create",
		async (data: { message: string; conversationId: string; sender: string }) => {
			try {
				const { message, conversationId, sender } = data;
				const newMessage = await messageCreator.run({
					body: message,
					sender,
					conversationId,
				});
				io.to(conversationId).emit("messages:new", newMessage.getData());
			} catch (error) {
				console.error(error);
			}
		}
	);

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
}

export default function socketManager(httpServer: HttpServer, frontUrl: string): SocketIoServer {
	const io = new SocketIoServer(httpServer, {
		cors: { origin: frontUrl },
	});

	io.on("connection", (socket: Socket) => {
		socketEventsHandler(socket, io);
	});

	return io;
}
