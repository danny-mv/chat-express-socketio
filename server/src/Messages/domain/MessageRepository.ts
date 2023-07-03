import { Message } from "./Message";

export interface MessageRepository {
	create(message: Message): Promise<Message>;
}
