import getCurrentUser from "./getCurrentUser";
import getSession from "./getSession";
interface User{
    id: string; 
    name: string; 
    email: string; 
    password: string
}
export interface Message{
    id: string;
    body: string;
    UserId: string;
    user?: User;
    createdAt: string;
    ConversationId: string;
    seenIds: string[];
}
export interface Conversation {
    id: string;
    name: string;
    users: User[];
	messages: Message[]
}
const getConversations = async ():Promise<Conversation[]> => {
    const session = await getSession();
    const currentUser = await getCurrentUser();

    if(!session?.user?.email){
        return [];
    }
    try {
        const response = await fetch("http://localhost:8000/conversations", {
                    method: "GET",
                    headers: {
                    authorization: `Bearer ${session.user.accessToken}`,
                    }
                    })
                    if(!response.ok){
                        return []
                    }
        const jsonResponse = await response.json()
        const data = jsonResponse.data.conversations as Conversation[];
        
        const transformedData = data.map(conversation => ({
            ...conversation,
            messages: conversation.messages.map(message => ({
                ...message,
                user: conversation.users.find(user => user.id === message.UserId),
            })),
        }));

        console.log(transformedData);

        return transformedData;
    } catch (error:any) {
        return []        
    }
}

export default getConversations;