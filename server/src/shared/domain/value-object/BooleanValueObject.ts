export abstract class BooleanValueObject {
	constructor(readonly value: boolean) {}
	protected abstract toString(): string;
}
