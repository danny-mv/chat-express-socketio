import { Model, ModelStatic } from "sequelize";

export abstract class SequelizeRepository {
	protected models: ModelStatic<Model>[];
	constructor(...models: ModelStatic<Model>[]) {
		this.models = models;
	}
}
