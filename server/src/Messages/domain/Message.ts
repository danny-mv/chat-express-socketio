import { RoomId } from "../../Rooms/domain/RoomId";
import { UserId } from "../../Users/domain/UserId";
import { MessageContent } from "./MessageContent";
import { MessageId } from "./MessageId";

export class Message {
	constructor(
		readonly id: MessageId,
		readonly userId: UserId,
		readonly roomId: RoomId,
		readonly content: MessageContent
	) {}

	static fromPrimitives(plainData: {
		id: string;
		userId: string;
		roomId: string;
		content: string;
	}): Message {
		return new Message(
			new MessageId(plainData.id),
			new UserId(plainData.userId),
			new RoomId(plainData.roomId),
			new MessageContent(plainData.content)
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			userId: this.userId.value,
			roomId: this.roomId.value,
			content: this.content.value,
		};
	}
}
