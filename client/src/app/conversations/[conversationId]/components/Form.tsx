"use client"

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { socket } from "@/app/lib/socketio";

const Form = () => {
    const { conversationId } = useConversation();
    const session = useSession()
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", {shouldValidate: true})
        /* axios.post(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/messages`, {
            ...data,
            conversationId
        }, {headers:{"Authorization": `Bearer ${session.data?.user.accessToken}`}}) */
        socket.emit('message:create', {
            ...data,
            conversationId,
            sender: session.data?.user.id, 
        });
        
    }

    return (
        <div
            className="
                py-4
                px-4
                bg-white
                border-t
                flex
                items-center
                gap-2
                lg:gap-4
                w-full
            "
        >
            {/* foto */}
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type="submit"
                    className="
                        rounded-full
                        p-2
                        bg-sky-500
                        cursor-pointer
                        hover:bg-sky-600
                        transition
                    "
                >
                    <HiPaperAirplane 
                        size={18}
                        className="text-white"
                    />
                </button>
            </form>
        </div>
    );
}

export default Form ;