export abstract class NumberValueObject {
	constructor(readonly value: number) {}
	protected abstract toString(): string;
}
