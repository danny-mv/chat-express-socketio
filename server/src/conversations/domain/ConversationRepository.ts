import { Conversation } from "./Conversation";

export interface ConversationRepository {
	create(conversation: Conversation): Promise<Conversation>;
}
