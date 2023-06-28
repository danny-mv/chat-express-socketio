

interface Message{
    id: string;
    body: string;
}
interface Conversation {
    id:string;
    name: string;
}
export type FullMessageType = Message & {
    senderId: string
    seen: string[]
};

export type FullConversationType = Conversation & {
    usersIds: string[]
    messageIds: FullMessageType[]
}