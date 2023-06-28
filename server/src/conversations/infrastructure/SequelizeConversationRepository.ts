import { Model, ModelAttributes, Sequelize } from "sequelize";

import { SequelizeRepository } from "../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { UserId } from "../../Users/domain/UserId";
import { SequelizeUserRepository } from "../../Users/infrastructure/persistences/sequelize/SequelizeUserRepository";
import { Conversation } from "../domain/Conversation";
import { ConversationRepository } from "../domain/ConversationRepository";
import { ConversationInstance } from "./ConversationInstance";

interface ConversationModel extends Model {
	addUsers: (users: Model[]) => Promise<void>;
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
		console.log(users);
		await createdConversation.addUsers(users);

		return conversation;
	}

	async findConversationsByUserId(userId: UserId): Promise<Conversation[]> {
		await this.sequelize.sync();
		const userConversations = await this.repository().findAll({
			include: [
				{
					model: this.userModel,
					where: { id: userId.value },
				},
			],
		});
		console.log(userConversations);

		return [];
	}

	protected entityInstance(): ModelAttributes {
		return ConversationInstance;
	}

	protected instanceName(): string {
		return "conversations";
	}
}
