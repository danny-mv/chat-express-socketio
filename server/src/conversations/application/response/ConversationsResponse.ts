import { Conversation } from "../../domain/Conversation";

interface ConversationResponse {
	id: string;
	name: string;
}

export class ConversationsResponse {
	private readonly conversations: any;
	constructor(conversations: Array<Conversation>) {
		this.conversations = conversations.map((conversation) => conversation.toPrimitives());
	}
}
