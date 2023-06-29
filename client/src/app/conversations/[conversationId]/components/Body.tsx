"use client"

import { Message } from "@/app/actions/getConversations";
import useConversation from "@/app/hooks/useConversation";
import { useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
    initialMessages: Message[]
}
const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation()

    return ( 
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length -1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24"/>
        </div>
     );
}
 
export default Body;