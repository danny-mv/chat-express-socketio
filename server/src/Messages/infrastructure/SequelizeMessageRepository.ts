import { SequelizeRepository } from "../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";

export class SequelizeMessageRepository extends SequelizeRepository implements MessageRepository {
	async create(message: Message): Promise<void> {
		await this.models[0].create({
			id: message.id.value,
			body: message.body.value,
			UserId: message.UserId.value,
			ConversationId: message.ConversationId.value,
		});
	}
}
