import { AfterAll, BeforeAll } from "@cucumber/cucumber";

import { App } from "../../../src/backend/App";
import { sequelize } from "../../../src/shared/infrastructure/persistence/config/sequelize.config";

let application: App;

BeforeAll(() => {
	application = new App();
	application.start();
});

AfterAll(async () => {
	await application.stop();
	await sequelize.drop();
});

export { application };
