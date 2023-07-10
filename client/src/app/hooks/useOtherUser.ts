import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Conversation } from "../actions/getConversations";


interface User{
    id: string;
    name: string;
    email: string
}
const useOtherUser = (conversation: Conversation | {users: User[]}) => {
    const { data: session } = useSession();
    
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.user.email;

        const otherUser = conversation.users.filter(user => user.email !== currentUserEmail)
        
        return otherUser;
    }, [session?.user.email, conversation.users])

    return otherUser[0];
}

export default useOtherUser;