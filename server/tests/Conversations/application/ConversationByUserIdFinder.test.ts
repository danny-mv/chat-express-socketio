import { mock, MockProxy } from "jest-mock-extended";

import { ConversationByUserIdFinder } from "../../../src/Conversations/application/ConversationByUserIdFinder";
import { ConversationsResponse } from "../../../src/Conversations/application/response/ConversationsResponse";
import { Conversation } from "../../../src/Conversations/domain/Conversation";
import { ConversationRepository } from "../../../src/Conversations/domain/ConversationRepository";
import { UserId } from "../../../src/Users/domain/UserId";

describe("ConversationByUserIdFinder", () => {
	let repository: MockProxy<ConversationRepository> & ConversationRepository;
	let conversationByUserIdFinder: ConversationByUserIdFinder;

	beforeEach(() => {
		repository = mock<ConversationRepository>();
		conversationByUserIdFinder = new ConversationByUserIdFinder(repository);
	});

	it("should find conversations by user ID", async () => {
		// Arrange
		const userId = "1";
		const conversationId1 = "abc";
		const conversationId2 = "def";

		const conversationsData = [
			{
				id: conversationId1,
				name: "Conversation 1",
				users: [],
				messages: [],
			},
			{
				id: conversationId2,
				name: "Conversation 2",
				users: [],
				messages: [],
			},
		];

		const conversations = conversationsData.map((conversation) =>
			Conversation.fromPrimitives(conversation)
		);

		repository.findConversationsByUserId.mockResolvedValue(conversations);

		const expectedResponse = new ConversationsResponse(conversations);

		// Act
		const response = await conversationByUserIdFinder.run(userId);

		// Assert
		expect(response).toEqual(expectedResponse);
		expect(repository.findConversationsByUserId).toHaveBeenCalledWith(new UserId(userId));
	});
});
