import { mock, MockProxy } from "jest-mock-extended";
import { v4 as uuidv4 } from "uuid";

import { ConversationCreator } from "../../../src/Conversations/application/ConversationCreator";
import { ConversationCreatorRequest } from "../../../src/Conversations/application/request/ConversationCreatorRequest";
import { ConversationCreatorResponse } from "../../../src/Conversations/application/response/ConversationCreatorResponse";
import { Conversation } from "../../../src/Conversations/domain/Conversation";
import { ConversationId } from "../../../src/Conversations/domain/ConversationId";
import { ConversationName } from "../../../src/Conversations/domain/ConversationName";
import { ConversationRepository } from "../../../src/Conversations/domain/ConversationRepository";
import { UserId } from "../../../src/Users/domain/UserId";

jest.mock("uuid");
describe("ConversationCreator", () => {
	let repository: MockProxy<ConversationRepository>;
	let conversationCreator: ConversationCreator;

	beforeEach(() => {
		repository = mock<ConversationRepository>();
		conversationCreator = new ConversationCreator(repository);
	});

	it("should create a conversation correctly", async () => {
		// Arrange
		const request: ConversationCreatorRequest = {
			userIds: ["1", "2", "3"],
			conversationName: "Test Conversation",
		};

		const conversationId = new ConversationId();
		const conversationName = new ConversationName(request.conversationName);
		const userIds = request.userIds.map((userId) => new UserId(userId));

		const expectedResponse: ConversationCreatorResponse = {
			id: conversationId.value,
			name: conversationName.value,
		};

		(uuidv4 as jest.Mock).mockReturnValue(conversationId.value);

		const conversation = new Conversation(conversationId, conversationName, userIds);
		repository.create.mockResolvedValue(conversation);

		// Act
		const response = await conversationCreator.run(request);

		// Assert
		expect(response).toEqual(expectedResponse);
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(repository.create).toHaveBeenCalledWith(conversation);
	});
});
