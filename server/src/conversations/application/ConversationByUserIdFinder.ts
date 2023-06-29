import { UserId } from "../../Users/domain/UserId";
import { ConversationRepository } from "../domain/ConversationRepository";
import { ConversationsResponse } from "./response/ConversationsResponse";

export class ConversationByUserIdFinder {
	constructor(private readonly conversationRepository: ConversationRepository) {}
	async run(userId: string): Promise<ConversationsResponse> {
		const conversationPersistence = await this.conversationRepository.findConversationsByUserId(
			new UserId(userId)
		);
		console.log(JSON.stringify(conversationPersistence), "conversationPersistence");
		const response = new ConversationsResponse(conversationPersistence);
		console.log(JSON.stringify(response), "RESPONSE");

		return response;
	}
}
