import { DataTypes, ModelAttributes } from "sequelize";

export const MessageInstance: ModelAttributes = {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	body: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};
