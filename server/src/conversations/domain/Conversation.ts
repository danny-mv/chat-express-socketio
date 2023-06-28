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
		userIds: string[];
		messageIds: string[];
	}): Conversation {
		return new Conversation(
			new ConversationId(plainData.id),
			new ConversationName(plainData.name),
			plainData.userIds.map((user) => new UserId(user)),
			plainData.messageIds.map((message) => new MessageId(message))
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			userIds: this.userIds.map((userId) => userId.value),
			messageIds: this.messageIds.map((messageId) => messageId.value),
		};
	}
}
