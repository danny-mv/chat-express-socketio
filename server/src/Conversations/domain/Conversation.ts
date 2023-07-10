import { Message } from "../../Messages/domain/Message";
import { User } from "../../Users/domain/User";
import { ConversationId } from "./ConversationId";
import { ConversationName } from "./ConversationName";

export class Conversation {
	constructor(
		readonly id: ConversationId,
		readonly name: ConversationName,
		readonly users?: User[],
		readonly messages?: Message[]
	) {}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		users?: { id: string; name: string; email: string; password: string }[];
		messages?: {
			id: string;
			body: string;
			UserId: string;
			ConversationId: string;
			createdAt: string;
		}[];
	}): Conversation {
		return new Conversation(
			new ConversationId(plainData.id),
			new ConversationName(plainData.name),
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
							UserId: message.UserId,
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
			users: this.users ? this.users.map((user) => user.toPrimitives()) : [],
			messages: this.messages ? this.messages.map((message) => message.toPrimitives()) : [],
		};
	}
}
