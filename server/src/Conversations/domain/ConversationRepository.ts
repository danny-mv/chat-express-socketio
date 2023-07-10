import { UserId } from "../../Users/domain/UserId";
import { Conversation } from "./Conversation";

export interface ConversationRepository {
	create(conversation: Conversation): Promise<Conversation>;
	findConversationsByUserId(userId: UserId): Promise<Conversation[]>;
}
