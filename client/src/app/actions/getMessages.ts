import getConversationById from "./getConversationById"

const getMessages = async(
    conversationId: string
) => {
    try {
        const conversation = await getConversationById(conversationId)

        return conversation ? conversation.messages : []
    } catch (error:any) {
        return []
    }
}

export default getMessages;