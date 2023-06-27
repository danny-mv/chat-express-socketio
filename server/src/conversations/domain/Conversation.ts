import { MessageId } from "../../Messages/domain/MessageId";
import { UserId } from "../../Users/domain/UserId";
import { ConversationId } from "./ConversationId";
import { ConversationName } from "./ConversationName";

export class Conversation {
	constructor(
		readonly id: ConversationId,
		readonly name: ConversationName,
		readonly userIds: UserId[],
		readonly messageIds: MessageId[]
	) {}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		users: string[];
		messages: string[];
	}): Conversation {
		return new Conversation(
			new ConversationId(plainData.id),
			new ConversationName(plainData.name),
			plainData.users.map((user) => new UserId(user)),
			plainData.messages.map((message) => new MessageId(message))
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			users: this.userIds.map((userId) => userId.value),
			messages: this.messageIds.map((messageId) => messageId.value),
		};
	}
}
