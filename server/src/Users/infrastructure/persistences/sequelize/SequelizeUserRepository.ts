import { ModelAttributes, Op } from "sequelize";

import { InvalidArgumentError } from "../../../../shared/domain/value-object/InvalidArgumentError";
import { SequelizeRepository } from "../../../../shared/infrastructure/persistence/sequelize/SequelizeRepository";
import { User } from "../../../domain/User";
import { UserEmail } from "../../../domain/UserEmail";
import { UserRepository } from "../../../domain/UserRepository";
import { UserInstance } from "./UserInstance";

export class SequelizeUserRepository extends SequelizeRepository implements UserRepository {
	async create(user: User): Promise<void> {
		await this.sequelize.sync();
		if (await this.findByEmail(user.email)) {
			throw new InvalidArgumentError("Email already exist");
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await this.repository().create(user.toPrimitives());
	}

	async findByEmail(_email: UserEmail): Promise<User | null> {
		await this.sequelize.sync();
		const user = await this.repository().findOne({ where: { email: _email.value } });
		if (!user) {
			return null;
		}
		const { id, name, email, password } = user.dataValues;

		return User.fromPrimitives({ id, name, email, password, conversationIds: [], messageIds: [] });
	}

	async findAllExceptUser(email: UserEmail): Promise<User[]> {
		await this.sequelize.sync();
		const usersFromPersistence = await this.repository().findAll({
			where: { [Op.not]: [{ email: email.value }] },
		});
		const users = usersFromPersistence.map((user) =>
			User.fromPrimitives({
				id: user.get("id") as string,
				name: user.get("name") as string,
				email: user.get("email") as string,
				password: user.get("password") as string,
				conversationIds: [],
				messageIds: [],
			})
		);

		return users;
	}

	protected entityInstance(): ModelAttributes {
		return UserInstance;
	}

	protected instanceName(): string {
		return "users";
	}
}
