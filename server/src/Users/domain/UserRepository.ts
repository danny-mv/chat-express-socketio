import { User } from "../../Users/domain/User";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";

export interface UserRepository {
	create(player: User): Promise<void>;
	findByEmail(email: UserEmail): Promise<User | null>;
}
