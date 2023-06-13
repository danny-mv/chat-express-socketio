import { Given, Then, When } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";

import { application } from "./hooks.steps";

let _request: request.Test;
let _response: request.Response;
let player: { name: string };
let data: { id: string; name: string };

Given("I send a GET request to {string}", (route: string) => {
	_request = request(application.httpServer).get(route);
});

Given("a send a POST request to {string} with this player", (route: string) => {
	// Write code here that turns the phrase above into concrete actions
	request(application.httpServer).post(route).send(player);
});
Then("the response status code should be {int}", async (status: number) => {
	_response = await _request.expect(status);
});
Then("the response body should be:", (response: string) => {
	assert.deepStrictEqual(_response.body, JSON.parse(response));
});
Given("a player name {string}", (name: string) => {
	// Write code here that turns the phrase above into concrete actions
	player = { name };
});

When("I send a POST request to {string} with this player", (route: string) => {
	// Write code here that turns the phrase above into concrete actions
	_request = request(application.httpServer).post(route).send(player);
});

Then("the response body should contain the player details", () => {
	const responseBody = _response.body;
	assert.strictEqual(responseBody.statusMsg, "Success");
	data = responseBody.data;
	assert.ok(data.id);
	assert.ok(data.name);
	assert.strictEqual(typeof data.id, "string");
	assert.strictEqual(typeof data.name, "string");
});
When("I send a PUT request to {string} with a new player name", function (route: string) {
	const routeWithId = `${route}/${data.id}`;
	_request = request(application.httpServer).put(routeWithId).send(player);
});
