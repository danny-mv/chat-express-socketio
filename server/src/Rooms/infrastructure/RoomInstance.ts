import { DataTypes, ModelAttributes } from "sequelize";

export const RoomInstance: ModelAttributes = {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};
