import { ConversationId } from "../../Conversations/domain/ConversationId";
import { UserId } from "../../Users/domain/UserId";
import { Message } from "../domain/Message";
import { MessageBody } from "../domain/MessageBody";
import { MessageId } from "../domain/MessageId";
import { MessageRepository } from "../domain/MessageRepository";
import { MessageCreatorRequest } from "./request/MessageCreatorRequest";

export class MessageCreator {
	constructor(private readonly messageRepository: MessageRepository) {}

	async run({ body, sender, conversationId }: MessageCreatorRequest): Promise<void> {
		const message = new Message(
			new MessageId(),
			new MessageBody(body),
			new UserId(sender),
			new ConversationId(conversationId),
			[]
		);
		await this.messageRepository.create(message);
	}
}
