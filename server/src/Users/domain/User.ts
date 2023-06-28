import { ConversationId } from "../../Conversations/domain/ConversationId";
import { MessageId } from "../../Messages/domain/MessageId";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

export class User {
	readonly conversationIds: ConversationId[];
	readonly messageIds: MessageId[];
	constructor(
		readonly id: UserId,
		readonly name: UserName,
		readonly email: UserEmail,
		readonly password: UserPassword,
		conversationIds?: ConversationId[],
		messageIds?: MessageId[]
	) {
		this.conversationIds = conversationIds ?? [];
		this.messageIds = messageIds ?? [];
	}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		email: string;
		password: string;
		conversationIds: string[];
		messageIds: string[];
	}): User {
		return new User(
			new UserId(plainData.id),
			new UserName(plainData.name),
			new UserEmail(plainData.email),
			new UserPassword(plainData.password),
			plainData.conversationIds.map((conversationId) => new ConversationId(conversationId)),
			plainData.messageIds.map((messageId) => new MessageId(messageId))
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			password: this.password.value,
			conversationIds: this.conversationIds.map((conversationId) => conversationId.value),
			messageIds: this.messageIds.map((messageId) => messageId.value),
		};
	}
}
