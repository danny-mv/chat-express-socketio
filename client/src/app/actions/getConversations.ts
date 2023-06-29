import getCurrentUser from "./getCurrentUser";
import getSession from "./getSession";
export interface Conversation {
    id: string;
    name: string;
    users: { id: string; name: string; email: string; password: string }[];
		messages: {
			id: string;
			body: string;
			userId: string;
			conversationId: string;
			seenIds: string[];
		}[]   
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
        console.log(data);

        return data;
    } catch (error:any) {
        return []        
    }
}

export default getConversations;