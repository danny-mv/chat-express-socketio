import { MessageId } from "../../Messages/domain/MessageId";
import { RoomId } from "../../Rooms/domain/RoomId";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

export class User {
	readonly rooms: RoomId[];
	readonly messages: MessageId[];
	constructor(
		readonly id: UserId,
		readonly name: UserName,
		readonly email: UserEmail,
		readonly password: UserPassword,
		rooms?: RoomId[],
		messages?: MessageId[]
	) {
		this.rooms = rooms ?? [];
		this.messages = messages ?? [];
	}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		email: string;
		password: string;
		rooms: string[];
		messages: string[];
	}): User {
		return new User(
			new UserId(plainData.id),
			new UserName(plainData.name),
			new UserEmail(plainData.email),
			new UserPassword(plainData.password),
			plainData.rooms.map((room) => new RoomId(room)),
			plainData.messages.map((message) => new MessageId(message))
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			rooms: this.rooms.map((roomId) => roomId.value),
			messages: this.messages.map((messageId) => messageId.value),
		};
	}
}
