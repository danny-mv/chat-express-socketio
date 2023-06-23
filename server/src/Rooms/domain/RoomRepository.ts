import { Room } from "./Room";

export interface RoomRepository {
	create(room: Room): Promise<void>;
}
