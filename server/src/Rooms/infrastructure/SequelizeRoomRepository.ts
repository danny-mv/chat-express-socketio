import { ModelAttributes } from "sequelize";

import { SequelizeRepository } from "../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { Room } from "../domain/Room";
import { RoomRepository } from "../domain/RoomRepository";
import { RoomInstance } from "./RoomInstance";

export class SequelizeUserRepository extends SequelizeRepository implements RoomRepository {
	async create(room: Room): Promise<void> {
		await this.sequelize.sync();
		/* if (await this.findByEmail(user.email)) {
			throw new InvalidArgumentError("Player's name already exist");
		} */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await this.repository().create(room.toPrimitives());
	}

	protected entityInstance(): ModelAttributes {
		return RoomInstance;
	}

	protected instanceName(): string {
		return "rooms";
	}
}
