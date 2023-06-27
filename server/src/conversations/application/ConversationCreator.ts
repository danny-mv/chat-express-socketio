import { UserId } from "../../Users/domain/UserId";
import { Conversation } from "../domain/Conversation";
import { ConversationId } from "../domain/ConversationId";
import { ConversationName } from "../domain/ConversationName";
import { ConversationRepository } from "../domain/ConversationRepository";
import { ConversationCreatorRequest } from "./request/ConversationCreatorRequest";

export class ConversationCreator {
	constructor(private readonly conversationRepository: ConversationRepository) {}
	async run({ userId, conversationName }: ConversationCreatorRequest): Promise<void> {
		const room = new Conversation(
			new ConversationId(),
			new ConversationName(conversationName),
			new UserId(userId),
			[]
		);
		await this.conversationRepository.create(room);
	}
}
