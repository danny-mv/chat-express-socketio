import { UserId } from "../../Users/domain/UserId";
import { Room } from "../domain/Room";
import { RoomId } from "../domain/RoomId";
import { RoomName } from "../domain/RoomName";
import { RoomRepository } from "../domain/RoomRepository";
import { RoomCreatorRequest } from "./request/RoomCreatorRequest";

export class RoomCreator {
	constructor(private readonly roomRepository: RoomRepository) {}
	async run({ userId, roomName }: RoomCreatorRequest): Promise<void> {
		const room = new Room(new RoomId(), new RoomName(roomName), new UserId(userId), []);
		await this.roomRepository.create(room);
	}
}
