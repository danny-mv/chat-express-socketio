import { Message } from "../../domain/Message";

export class MessageCreatorResponse {
	private readonly message: any;
	constructor(message: Message) {
		this.message = message.toPrimitives();
	}

	getData(): any {
		return this.message;
	}
}
