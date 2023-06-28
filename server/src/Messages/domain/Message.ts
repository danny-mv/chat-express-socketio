import { ConversationId } from "../../Conversations/domain/ConversationId";
import { UserId } from "../../Users/domain/UserId";
import { MessageBody } from "./MessageBody";
import { MessageId } from "./MessageId";

export class Message {
	constructor(
		readonly id: MessageId,
		readonly body: MessageBody,
		readonly senderId: UserId,
		readonly conversationId: ConversationId,
		readonly seenIds: UserId[]
	) {}

	static fromPrimitives(plainData: {
		id: string;
		body: string;
		userId: string;
		conversationId: string;
		seenIds: string[];
	}): Message {
		return new Message(
			new MessageId(plainData.id),
			new MessageBody(plainData.body),
			new UserId(plainData.userId),
			new ConversationId(plainData.conversationId),
			plainData.seenIds.map((userId) => new UserId(userId))
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			userId: this.senderId.value,
			roomId: this.conversationId.value,
			content: this.body.value,
		};
	}
}
