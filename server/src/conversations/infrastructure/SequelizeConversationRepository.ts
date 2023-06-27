import { ModelAttributes } from "sequelize";

import { SequelizeRepository } from "../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { UserId } from "../../Users/domain/UserId";
import { Conversation } from "../domain/Conversation";
import { ConversationRepository } from "../domain/ConversationRepository";
import { ConversationInstance } from "./ConversationInstance";

export class SequelizeConversationRepository
	extends SequelizeRepository
	implements ConversationRepository
{
	async create(userId: UserId): Promise<Conversation> {
		await this.sequelize.sync();
		/* if (await this.findByEmail(user.email)) {
			throw new InvalidArgumentError("Player's name already exist");
		} */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await this.repository().create(conversation.toPrimitives());
	}

	protected entityInstance(): ModelAttributes {
		return ConversationInstance;
	}

	protected instanceName(): string {
		return "conversations";
	}
}
