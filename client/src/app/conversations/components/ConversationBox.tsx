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
    if(session.status !== "authenticated") {
        return (
            
        <div className="flex gap-3 p-4 animate-pulse ">
            <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <div className="flex flex-col gap-2">
                <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full py-2 px-3"></div>
            </div>
        </div>
        )
        }
        
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
                p-3
            `,
            selected ? "bg-neutral-100" : "bg-white"
            )}
        >
            <Avatar user={otherUser}/>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div 
                        className="
                            flex
                            justify-between
                            items-center
                            mb-1
                        "
                    >
                        <p
                            className="
                                text-md
                                font-medium
                                text-gray-900
                            ">
                            {otherUser.name}
                        </p>
                        {/* lastmessage?.createdAt */}
                    </div>
                    <p 
                        className={clsx(`
                            truncate
                            text-sm
                        `/* hasSeen */
                        )}
                    >
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ConversationBox;