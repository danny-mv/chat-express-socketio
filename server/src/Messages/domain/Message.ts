import { ConversationId } from "../../Conversations/domain/ConversationId";
import { User } from "../../Users/domain/User";
import { UserId } from "../../Users/domain/UserId";
import { MessageBody } from "./MessageBody";
import { MessageId } from "./MessageId";

export class Message {
	constructor(
		readonly id: MessageId,
		readonly body: MessageBody,
		readonly UserId: UserId,
		readonly ConversationId: ConversationId,
		readonly seenIds?: UserId[],
		readonly user?: User,
		readonly createdAt?: Date
	) {}

	static fromPrimitives(plainData: {
		id: string;
		body: string;
		UserId: string;
		ConversationId: string;
		seenIds?: string[];
		user?: { id: string; name: string; email: string; password: string; conversationIds: [] };
		createdAt?: string;
	}): Message {
		return new Message(
			new MessageId(plainData.id),
			new MessageBody(plainData.body),
			new UserId(plainData.UserId),
			new ConversationId(plainData.ConversationId),
			plainData.seenIds ? plainData.seenIds.map((userId) => new UserId(userId)) : [],
			plainData.user ? User.fromPrimitives(plainData.user) : undefined, // Aquí añadimos la comprobación
			plainData.createdAt ? new Date(plainData.createdAt) : undefined
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			body: this.body.value,
			UserId: this.UserId.value,
			ConversationId: this.ConversationId.value,
			seenIds: [],
			user: this.user ? this.user.toPrimitives() : undefined,
			createdAt: this.createdAt,
		};
	}
}
