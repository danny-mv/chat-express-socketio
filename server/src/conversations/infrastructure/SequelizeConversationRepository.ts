import { Model, ModelAttributes, Sequelize } from "sequelize";

import { SequelizeRepository } from "../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { UserId } from "../../Users/domain/UserId";
import { SequelizeUserRepository } from "../../Users/infrastructure/persistences/sequelize/SequelizeUserRepository";
import { Conversation } from "../domain/Conversation";
import { ConversationRepository } from "../domain/ConversationRepository";
import { ConversationInstance } from "./ConversationInstance";

interface ConversationModel extends Model {
	dataValues: {
		id: string;
		name: string;
		// cualquier otra propiedad que necesites
	};

	addUsers: (users: string[]) => Promise<void>;
}
export class SequelizeConversationRepository
	extends SequelizeRepository
	implements ConversationRepository
{
	private readonly userModel;
	constructor(sequelize: Sequelize) {
		super(sequelize);
		const conversationModel = this.repository();
		this.userModel = new SequelizeUserRepository(sequelize).repository();
		this.userModel.belongsToMany(conversationModel, { through: "Users_Conversations" });
		conversationModel.belongsToMany(this.userModel, { through: "Users_Conversations" });
	}

	async create(conversation: Conversation): Promise<Conversation> {
		await this.sequelize.sync();
		/* if (await this.findByEmail(user.email)) {
			throw new InvalidArgumentError("Player's name already exist");
		} */
		//TODO find existing conversations
		const createdConversation = (await this.repository().create({
			id: conversation.id.value,
			name: conversation.name.value,
		})) as ConversationModel;
		const users = await this.userModel.findAll({
			where: { id: conversation.userIds.map((userId) => userId.value) },
		});
		const userIds = conversation.userIds.map((userId) => userId.value);
		console.log(users);
		try {
			await createdConversation.addUsers(userIds);
		} catch (error) {
			console.log(error);
		}

		return conversation;
	}

	async findConversationsByUserId(userId: UserId): Promise<Conversation[]> {
		await this.sequelize.sync();
		const userConversations = (await this.repository().findAll({
			include: [
				{
					model: this.userModel,
					where: { id: userId.value },
				},
			],
		})) as unknown as ConversationModel[];
		console.log({ userConversations });

		return userConversations.map((conversationData) => {
			const { id, name } = conversationData.dataValues;
			const userIds: string[] = [];
			const messageIds: string[] = [];

			return Conversation.fromPrimitives({ id, name, userIds, messageIds });
		});
	}

	protected entityInstance(): ModelAttributes {
		return ConversationInstance;
	}

	protected instanceName(): string {
		return "conversations";
	}
}
