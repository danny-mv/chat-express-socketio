"use client"

import { Message } from "@/app/actions/getConversations";
import getUsers, { User } from "@/app/actions/getUsers";
import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

interface MessageBoxProps {
    data: Message;
    isLast?: boolean;    
}
const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {
    const { data: session, status } = useSession();

    
    
    const isOwn = session?.user?.id === data.UserId;
    
    //TODO seenList 5:07

    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end"
    );
    
    const avatar = clsx(isOwn && "order-2");

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    );

    const message = clsx(
        "text-sm w-fit overflow-hidden rounded-full py-2 px-3",
        isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
        //TODO image 5:10
    )
    
    if(status !== "authenticated") {
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
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data?.user}/>
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.user?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {data.createdAt ? format(new Date(data.createdAt), 'p') : ""}
                        
                    </div>
                </div>
                <div className={message}>
                    {/* Image 5:14 */}
                    <div>{data.body}</div>
                </div>
            </div>
        </div>
    );
}

export default MessageBox;