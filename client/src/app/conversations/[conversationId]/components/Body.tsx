"use client"

import { Message } from "@/app/actions/getConversations";
import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { socket } from "@/app/lib/socketio";
import { find } from "lodash";

interface BodyProps {
    initialMessages: Message[]
}
const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation()

    useEffect(() => {
        socket.emit("join", conversationId);
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message: Message) => {
            console.log("reccibido");
            setMessages((current) => {
                if(find(current, {id: message.id})){
                    return current
                }

                return [...current, message]
            });
            bottomRef?.current?.scrollIntoView();
        }
        socket.on('messages:new', messageHandler);
        return () => {
            socket.off('messages:new', messageHandler)
        }
        }, [conversationId])
    

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