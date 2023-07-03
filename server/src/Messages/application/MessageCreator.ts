import { ConversationId } from "../../Conversations/domain/ConversationId";
import { UserId } from "../../Users/domain/UserId";
import { Message } from "../domain/Message";
import { MessageBody } from "../domain/MessageBody";
import { MessageId } from "../domain/MessageId";
import { MessageRepository } from "../domain/MessageRepository";
import { MessageCreatorRequest } from "./request/MessageCreatorRequest";
import { MessageCreatorResponse } from "./response/MessageCreatorResponse";

export class MessageCreator {
	constructor(private readonly messageRepository: MessageRepository) {}

	async run({
		body,
		sender,
		conversationId,
	}: MessageCreatorRequest): Promise<MessageCreatorResponse> {
		const message = new Message(
			new MessageId(),
			new MessageBody(body),
			new UserId(sender),
			new ConversationId(conversationId),
			[]
		);
		const data = await this.messageRepository.create(message);

		return new MessageCreatorResponse(data);
	}
}
