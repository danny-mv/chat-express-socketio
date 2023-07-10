import { DataTypes, ModelAttributes } from "sequelize";

export const ConversationInstance: ModelAttributes = {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};
