import { UserId } from "../../Users/domain/UserId";
import { Conversation } from "../domain/Conversation";
import { ConversationId } from "../domain/ConversationId";
import { ConversationName } from "../domain/ConversationName";
import { ConversationRepository } from "../domain/ConversationRepository";
import { ConversationCreatorRequest } from "./request/ConversationCreatorRequest";

export class ConversationCreator {
	constructor(private readonly conversationRepository: ConversationRepository) {}
	async run({ userIds, conversationName }: ConversationCreatorRequest): Promise<Conversation> {
		const conversation = new Conversation(
			new ConversationId(),
			new ConversationName(conversationName),
			userIds.map((id) => new UserId(id)),
			[]
		);

		return await this.conversationRepository.create(conversation);
	}
}
