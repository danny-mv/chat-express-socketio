import { v4 as uuidv4 } from "uuid";

export class Uuid {
	readonly value: string;
	constructor(value?: string) {
		value ? (this.value = value) : (this.value = uuidv4());
	}

	toString(): string {
		return this.value;
	}
}
