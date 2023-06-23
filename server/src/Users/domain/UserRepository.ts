import { User } from "../../Users/domain/User";
import { UserEmail } from "./UserEmail";

export interface UserRepository {
	create(user: User): Promise<void>;
	findByEmail(email: UserEmail): Promise<User | null>;
}
