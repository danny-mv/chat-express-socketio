import { UserId } from "../../Users/domain/UserId";
import { Conversation } from "./Conversation";

export interface ConversationRepository {
	create(userId: UserId): Promise<Conversation>;
}
