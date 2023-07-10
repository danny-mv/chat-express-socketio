import { SequelizeRepository } from "../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";

export class SequelizeMessageRepository extends SequelizeRepository implements MessageRepository {
	async create(message: Message): Promise<Message> {
		await this.models[0].create({
			id: message.id.value,
			body: message.body.value,
			userId: message.UserId.value,
			conversationId: message.ConversationId.value,
		});
		const data = await this.models[0].findOne({
			where: { id: message.id.value },
			include: [
				{
					model: this.models[1], // Asegúrate de que este es el modelo de usuario
					attributes: ["id", "name", "email"], // Selecciona los atributos que quieres incluir
				},
			],
		});
		if (!data) {
			throw new Error("Could not save");
		}
		const { id, body, userId, conversationId, createdAt } = data.dataValues;
		const user = data.dataValues.user.dataValues;

		return Message.fromPrimitives({
			id,
			body,
			UserId: userId,
			ConversationId: conversationId,
			user,
			createdAt,
		});
	}
}
