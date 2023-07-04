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
    console.log(data);
    const { data: session, status } = useSession();

    if(status !== "authenticated") {
    return <div>Loading...</div>; // o algún otro componente de carga
    }
    
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