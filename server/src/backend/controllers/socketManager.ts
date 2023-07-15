import { Server as HttpServer } from "http";
import { JwtPayload, verify } from "jsonwebtoken";
import { Server as SocketIoServer, Socket } from "socket.io";

import { ConversationCreator } from "../../Conversations/application/ConversationCreator";
import { SequelizeConversationRepository } from "../../Conversations/infrastructure/SequelizeConversationRepository";
import { MessageCreator } from "../../Messages/application/MessageCreator";
import { SequelizeMessageRepository } from "../../Messages/infrastructure/SequelizeMessageRepository";
import {
	Conversation,
	Message,
	User,
} from "../../shared/infrastructure/persistence/config/sequelize.config";

declare module "socket.io" {
	export interface Socket {
		userData: {
			id: string;
		};
	}
}
function socketEventsHandler(socket: Socket, io: SocketIoServer) {
	const messageSequelize = new SequelizeMessageRepository(Message, User);
	const conversationSequelize = new SequelizeConversationRepository(Conversation, User);
	const messageCreator = new MessageCreator(messageSequelize);
	const conversationCreator = new ConversationCreator(conversationSequelize);
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

	socket.on("conversation:create", async (body: { userId: string; name: string }) => {
		try {
			const { userId, name } = body;
			const userIds = [userId];
			const data = await conversationCreator.run({
				userIds,
				conversationName: name,
			});
			io.to(userId).emit("conversation:update", data);
		} catch (err) {
			console.error(err);
		}
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
}

export default function socketManager(httpServer: HttpServer, frontUrl: string): SocketIoServer {
	const io = new SocketIoServer(httpServer, {
		cors: { origin: frontUrl },
	});
	io.use((socket, next) => {
		const token = socket.handshake.auth.token as string;

		if (token) {
			verify(token, process.env.SECRET ?? "", (err, decoded) => {
				if (err) {
					next(new Error("Authentication Error"));
				} else {
					const { id } = decoded as JwtPayload;
					socket.userData = { id };
					next();
				}
			});
		} else {
			next(new Error("Authentication Error"));
		}
	});
	io.on("connection", (socket: Socket) => {
		socketEventsHandler(socket, io);
	});

	return io;
}
