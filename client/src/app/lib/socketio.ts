import { getSession } from "next-auth/react";
import { io } from "socket.io-client"
export const socket = io(process.env.NEXT_PUBLIC_API_URL ?? "", {
    auth: async(cb) => {
        await getSession().then(session => cb({token: session?.user.accessToken})) }
    });