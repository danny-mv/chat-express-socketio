import { Message } from "../../Messages/domain/Message";
import { User } from "../../Users/domain/User";
import { UserId } from "../../Users/domain/UserId";
import { ConversationId } from "./ConversationId";
import { ConversationName } from "./ConversationName";

export class Conversation {
	constructor(
		readonly id: ConversationId,
		readonly name: ConversationName,
		readonly usersIds?: UserId[],
		readonly users?: User[],
		readonly messages?: Message[]
	) {}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		users?: { id: string; name: string; email: string; password: string }[];
		usersIds?: string[];
		messages?: {
			id: string;
			body: string;
			userId: string;
			conversationId: string;
			createdAt: string;
		}[];
	}): Conversation {
		return new Conversation(
			new ConversationId(plainData.id),
			new ConversationName(plainData.name),
			plainData.users ? plainData.usersIds?.map((userId) => new UserId(userId)) : [],
			plainData.users
				? plainData.users.map((user) =>
						User.fromPrimitives({
							id: user.id,
							name: user.name,
							email: user.email,
							password: user.password,
							conversationIds: [],
							messageIds: [],
						})
				  )
				: [],
			plainData.messages
				? plainData.messages.map((message) =>
						Message.fromPrimitives({
							id: message.id,
							body: message.body,
							UserId: message.userId,
							ConversationId: plainData.id,
							createdAt: message.createdAt,
							seenIds: [],
						})
				  )
				: []
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			usersIds: this.usersIds ? this.usersIds.map((userId) => userId.value) : [],
			users: this.users ? this.users.map((user) => user.toPrimitives()) : [],
			messages: this.messages ? this.messages.map((message) => message.toPrimitives()) : [],
		};
	}
}
