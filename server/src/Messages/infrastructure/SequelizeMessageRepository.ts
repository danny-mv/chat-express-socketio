import { Model, ModelAttributes } from "sequelize";

import { SequelizeRepository } from "../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";

export class SequelizeMessageRepository extends SequelizeRepository implements MessageRepository {
	async create(message: Message): Promise<void> {
		throw new Error("Method not implemented.");
	}

	protected entityInstance(): ModelAttributes<Model<any, any>, any> {
		throw new Error("Method not implemented.");
	}

	protected instanceName(): string {
		throw new Error("Method not implemented.");
	}
}
