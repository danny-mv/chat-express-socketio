import { Model, QueryTypes } from "sequelize";

import { sequelize } from "../../shared/infrastructure/persistence/config/sequelize.config";
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
		if (!conversation.usersIds) {
			throw new Error("There are not users");
		}
		const userIds = conversation.usersIds.map((user) => user.value);
		const existingConversation = await this.findConversationsBetweenTwoUsers(
			conversation.usersIds[0],
			conversation.usersIds[1]
		);
		if (existingConversation.length > 0) {
			return existingConversation[0];
		}
		const createdConversation = (await this.models[0].create({
			id: conversation.id.value,
			name: conversation.name.value,
		})) as ConversationModel;
		const users = await this.models[1].findAll({
			where: { id: conversation.usersIds },
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
			const { id, name, users, messages } = conversationData.dataValues;

			return Conversation.fromPrimitives({ id, name, users, messages });
		});
	}

	async findConversationsBetweenTwoUsers(
		userId1: UserId,
		userId2: UserId
	): Promise<Conversation[]> {
		const result = await sequelize.query(
			`
			SELECT c.*
			FROM ${this.models[0].tableName} c
			JOIN users_conversations uc1 ON uc1.conversationId = c.id
			JOIN users_conversations uc2 ON uc2.conversationId = c.id
			WHERE uc1.userId = :userId1
			AND uc2.userId = :userId2
		`,
			{
				replacements: { userId1: userId1.value, userId2: userId2.value },
				type: QueryTypes.SELECT,
			}
		);
		const conversations = result as { id: string; name: string }[];

		return conversations.map(({ id, name }) => Conversation.fromPrimitives({ id, name }));
	}
}
