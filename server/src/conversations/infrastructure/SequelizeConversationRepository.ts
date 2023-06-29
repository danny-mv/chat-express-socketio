import { Model } from "sequelize";

import { SequelizeRepository } from "../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { UserId } from "../../Users/domain/UserId";
import { Conversation } from "../domain/Conversation";
import { ConversationRepository } from "../domain/ConversationRepository";

interface ConversationModel extends Model {
	dataValues: {
		id: string;
		name: string;
	};

	addUsers: (users: string[]) => Promise<void>;
}
export class SequelizeConversationRepository
	extends SequelizeRepository
	implements ConversationRepository
{
	async create(conversation: Conversation): Promise<Conversation> {
		/* if (await this.findByEmail(user.email)) {
			throw new InvalidArgumentError("Player's name already exist");
		} */
		//TODO find existing conversations
		const createdConversation = (await this.models[0].create({
			id: conversation.id.value,
			name: conversation.name.value,
		})) as ConversationModel;
		const users = await this.models[1].findAll({
			where: { id: conversation.users.map((user) => user.id.value) },
		});
		if (users.length < 2 || users.length === 0) {
			throw new Error("Invalid users length");
		}
		const userIds = conversation.users.map((user) => user.id.value);
		try {
			await createdConversation.addUsers(userIds);
		} catch (error) {
			console.log(error);
		}

		return conversation;
	}

	async findConversationsByUserId(userId: UserId): Promise<Conversation[]> {
		const userConversationsIds = await this.models[0].findAll({
			where: {
				"$users.id$": userId.value,
			},
			include: [
				{
					model: this.models[1],
					through: { attributes: [] },
					attributes: [],
				},
			],
			attributes: ["id"],
		});

		// Ahora, obtenemos todas las conversaciones que coinciden con las IDs obtenidas anteriormente
		const userConversations = await this.models[0].findAll({
			where: {
				id: userConversationsIds.map((conversation) => conversation.id),
			},
			include: [
				{
					model: this.models[1],
					through: { attributes: [] },
					attributes: { exclude: ["password"] },
				},
				{
					model: this.models[2],
					// Aquí puedes excluir campos de los mensajes si lo necesitas
				},
			],
		});
		console.log(userConversations.map((cn) => cn.dataValues));

		return userConversations.map((conversationData) => {
			const { id, name, Users, Messages } = conversationData.dataValues;

			return Conversation.fromPrimitives({ id, name, users: Users, messages: Messages });
		});
	}
}
