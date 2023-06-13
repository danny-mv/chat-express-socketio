import { MessageId } from "../../Messages/domain/MessageId";
import { UserId } from "../../Users/domain/UserId";
import { RoomId } from "./RoomId";
import { RoomName } from "./RoomName";

export class Room {
	constructor(
		readonly id: RoomId,
		readonly name: RoomName,
		readonly userId: UserId,
		readonly messages: MessageId[]
	) {}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		userId: string;
		messages: string[];
	}): Room {
		return new Room(
			new RoomId(plainData.id),
			new RoomName(plainData.name),
			new UserId(plainData.userId),
			plainData.messages.map((message) => new MessageId(message))
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			userId: this.userId.value,
			messages: this.messages.map((messageId) => messageId.value),
		};
	}
}
