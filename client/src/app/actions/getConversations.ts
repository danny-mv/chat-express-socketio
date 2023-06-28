import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser?.id){
        return [];
    }
    try {
        const conversations = await fetch("http://localhost:8000/conversations")
    } catch (error:any) {
        return []        
    }
}