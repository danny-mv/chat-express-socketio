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
		if (!conversation.users) {
			throw new Error("There are not users");
		}
		const userIds = conversation.users.map((user) => user.id.value);
		const existingConversation = await this.models[0].findOne({
			include: [
				{
					model: this.models[1],
					where: { id: userIds },
					attributes: [],
				},
			],
		});
		if (existingConversation) {
			const { id, name } = existingConversation.dataValues;

			return Conversation.fromPrimitives({ id, name });
		}
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

		const userConversations = await this.models[0].findAll({
			where: {
				id: userConversationsIds.map((conversation) => conversation.dataValues.id),
			},
			include: [
				{
					model: this.models[1],
					through: { attributes: [] },
					attributes: { exclude: ["password"] },
				},
				{
					model: this.models[2],
				},
			],
			order: [[this.models[2], "createdAt", "ASC"]],
		});

		return userConversations.map((conversationData) => {
			const { id, name, Users, Messages } = conversationData.dataValues;

			return Conversation.fromPrimitives({ id, name, users: Users, messages: Messages });
		});
	}
}
