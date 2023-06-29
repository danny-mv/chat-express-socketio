import getConversations from "./getConversations"

const getConversationById = async(conversationId: string) => {
    
    try {
        const conversations = await getConversations() 
        if(!conversations){
            return null;
        }

        return conversations.filter(conversation => conversation.id === conversationId)[0]
    } catch (error:any) {
        return null
    }
}

export default getConversationById