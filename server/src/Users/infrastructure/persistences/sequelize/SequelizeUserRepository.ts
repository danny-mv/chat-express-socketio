import { ModelAttributes, Sequelize } from "sequelize";
import { SequelizeRepository } from "../../../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { UserRepository } from "../../../domain/UserRepository";
import { UserInstance } from "./UserInstance";
import { User } from "../../../domain/User";
import { UserEmail } from "../../../domain/UserEmail";
import { InvalidArgumentError } from "../../../../shared/domain/value-object/InvalidArgumentError";

export class SequelizeUserRepository extends SequelizeRepository implements UserRepository {
	constructor(sequelize: Sequelize) {
		super(sequelize);
	}

	async create(user: User): Promise<void> {
		await this.sequelize.sync();
		if (await this.findByEmail(user.email)) {
			throw new InvalidArgumentError("Player's name already exist");
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await this.repository().create(user.toPrimitives());
	}
	async findByEmail(email: UserEmail): Promise<User | null> {
		await this.sequelize.sync();
		const user = await this.repository().findOne({ where: { email: email.value } });

		return user ? User.fromPrimitives(user.dataValues) : null;
	}
	protected entityInstance(): ModelAttributes {
		return UserInstance;
	}

	protected instanceName(): string {
		return "users";
	}
}
