import { Conversation } from "../../domain/Conversation";

export class ConversationsResponse {
	private readonly conversations: any;
	constructor(conversations: Array<Conversation>) {
		this.conversations = conversations.map((conversation) => conversation.toPrimitives());
	}
}
