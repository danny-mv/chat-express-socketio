import { User } from "../../Users/domain/User";
import { UserId } from "./UserId";
import { UserName } from "./UserName";

export interface UserRepository {
	create(player: User): Promise<void>;
	update(player: User): Promise<void>;
	findById(id: UserId): Promise<User | null>;
	findByName(name: UserName): Promise<User | null>;
	findAll(): Promise<User[] | null>;
}
