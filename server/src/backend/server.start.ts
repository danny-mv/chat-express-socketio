import { App } from "./App";

try {
	void new App().start();
} catch (e) {
	//console.error(e);
	process.exit(1);
}

process.on("uncaughtException", () => {
	//console.error("Hubo una excepción no capturada: ", err);
	process.exit(1);
});
