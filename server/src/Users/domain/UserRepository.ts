import { User } from "../../Users/domain/User";
import { UserEmail } from "./UserEmail";

export interface UserRepository {
	create(player: User): Promise<void>;
	findByEmail(email: UserEmail): Promise<User | null>;
}
