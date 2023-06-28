import getCurrentUser from "./getCurrentUser";
import getSession from "./getSession";
export interface Conversation {
    id: string;
    name: string;
    userIds: string[];
    messageIds: string[]    
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
        const data = jsonResponse.data as Conversation[];

        return data;
    } catch (error:any) {
        return []        
    }
}

export default getConversations;