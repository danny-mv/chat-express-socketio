import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
	openapi: "3.0.0",
	info: {
		title: "Documentation of this API",
		version: "1.0.0.",
	},
	servers: [
		{
			url: "http://localhost:8000",
		},
	],
	components: {
		schemas: {
			Player: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "The name of the player",
					},
				},
				required: ["name"],
			},
			PlayerCreatorResponse: {
				type: "object",
				properties: {
					id: {
						type: "string",
						description: "The id of the created player",
					},
					name: {
						type: "string",
						description: "The name of the created player",
					},
				},
			},
			ApiResponseSuccess: {
				type: "object",
				properties: {
					status: {
						type: "integer",
						description: "The status code",
					},
					statusMsg: {
						type: "string",
						description: "The status message",
					},
					data: {
						type: "object",
						description: "The data of the response",
					},
				},
			},
			ApiResponseBadRequest: {
				type: "object",
				properties: {
					status: {
						type: "integer",
						description: "The status code",
					},
					statusMsg: {
						type: "string",
						description: "The status message",
					},
					error: {
						type: "string",
						description: "The error message",
					},
				},
			},
			ApiResponseServerError: {
				type: "object",
				properties: {
					status: {
						type: "integer",
						description: "The status code",
					},
					statusMsg: {
						type: "string",
						description: "The status message",
					},
					error: {
						type: "string",
						description: "The error message",
					},
				},
			},
		},
	},
};
const swaggerOptions: OAS3Options = {
	swaggerDefinition,
	apis: ["./src/backend/routes/**/*.ts"],
};
export default swaggerJSDoc(swaggerOptions);
