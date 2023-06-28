import { UserId } from "../../Users/domain/UserId";
import { Conversation } from "../domain/Conversation";
import { ConversationId } from "../domain/ConversationId";
import { ConversationName } from "../domain/ConversationName";
import { ConversationRepository } from "../domain/ConversationRepository";
import { ConversationCreatorRequest } from "./request/ConversationCreatorRequest";
import { ConversationCreatorResponse } from "./response/ConversationCreatorResponse";

export class ConversationCreator {
	constructor(private readonly conversationRepository: ConversationRepository) {}
	async run({
		userIds,
		conversationName,
	}: ConversationCreatorRequest): Promise<ConversationCreatorResponse> {
		const conversation = new Conversation(
			new ConversationId(),
			new ConversationName(conversationName),
			userIds.map((id) => new UserId(id)),
			[]
		);

		const conversationPersistence = await this.conversationRepository.create(conversation);

		return { id: conversationPersistence.id.value, name: conversationPersistence.name.value };
	}
}
