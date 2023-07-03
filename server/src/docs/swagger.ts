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
			UserLogin: {
				type: "object",
				properties: {
					email: {
						type: "string",
						description: "Email of the user",
						format: "email",
					},
					password: {
						type: "string",
						description: "Password of the user",
						format: "password",
					},
				},
				required: ["email", "password"],
			},
			LoginRequest: {
				type: "object",
				properties: {
					email: {
						type: "string",
						description: "The email of the user logging in",
					},
					password: {
						type: "string",
						description: "The password of the user logging in",
					},
				},
				required: ["email", "password"],
			},
			LoginResponse: {
				type: "object",
				properties: {
					id: {
						type: "string",
						description: "The id of the logged in user",
					},
					name: {
						type: "string",
						description: "The name of the logged in user",
					},
					accessToken: {
						type: "string",
						description: "The access token for the logged in user",
					},
				},
			},
			User: {
				type: "object",
				properties: {
					id: {
						type: "string",
						description: "The id of the user",
					},
					name: {
						type: "string",
						description: "The name of the user",
					},
					email: {
						type: "string",
						description: "The email of the user",
						format: "email",
					},
					// Agrega más propiedades si es necesario
				},
			},
			UserRegister: {
				type: "object",
				properties: {
					id: {
						type: "string",
						description: "The id of the new user",
					},
					name: {
						type: "string",
						description: "The name of the new user",
					},
					email: {
						type: "string",
						description: "The email of the new user",
					},
					password: {
						type: "string",
						description: "The password of the new user",
					},
				},
				required: ["id", "name", "email", "password"],
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
			ApiResponseUnauthorized: {
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
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
};
const swaggerOptions: OAS3Options = {
	swaggerDefinition,
	apis: ["./src/backend/routes/**/*.ts"],
};
export default swaggerJSDoc(swaggerOptions);
