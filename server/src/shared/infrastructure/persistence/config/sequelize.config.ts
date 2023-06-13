import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";

dotenv.config();
const username = process.env.MYSQL_USER ?? "";
const password = process.env.MYSQL_PASSWORD ?? "";
const database = process.env.DATABASE_NAME ?? "";
export const logBuffer: string[] = [];
const dialect: Dialect = "mysql";
const options = { dialect, logging: true };
if (process.env.NODE_ENV !== "dev") {
	options.logging = false;
}
export const sequelize = new Sequelize(database, username, password, options);
export async function initializeDatabase(): Promise<void> {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		await sequelize.sync();
		console.log("Database & tables created!");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}
initializeDatabase();
