"use client"

import { Conversation } from "@/app/actions/getConversations";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps{
    data: Conversation,
    selected?: boolean;
}
const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    },[data.id, router]);

    const lastMessage = useMemo(()=> {
        const messages = data.messages || []

        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
        },[session.data?.user?.email])
    
    /* const hasSeen = useMemo(()=> {
        if(!lastMessage){
            return false;
        }
        const seenArray = lastMessage.seenIds || []

        if(!userEmail){
            false
        }

        return seenArray.filter(user => user.email === userEmail)
    },[]) */

    const lastMessageText = useMemo(() => {
        if(lastMessage?.body){
            return lastMessage.body
        }

        return "Started a conversation"
    },[lastMessage])

    return ( 
        <div
            onClick={handleClick}
            className={clsx(`
                w-full
                relative
                flex
                items-center
                space-x-3
                hover:bg-neutral-100
                rounded-lg
                transition
                cursor-pointer
            `,
            selected ? "bg-neutral-100" : "bg-white"
            )}
        >
            <Avatar user={otherUser}/>
            ConvesationBox!
        </div>
     );
}
 
export default ConversationBox;