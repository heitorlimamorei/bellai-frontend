import IMessage from "@/types/message";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type IRole = "user" | "system" | "assistant";

function getMessage(role: IRole, content: string): IMessage {
    return {
        id: uuidv4(),
        content: content,
        role: role
    }
}

const systemMessage = getMessage("system", "Olá sou a Bellai, como posso te ajudar ?");

const standardConversation = [
    systemMessage,
    getMessage("user", "init"),
    getMessage("assistant", "Sobre qual sala (ano/letra) estamos falando ?"),
    getMessage("user", "3/a"),
    getMessage("assistant", "Me conte o que está acontecendo"),
    getMessage("user", "blablablabla"),
    getMessage("assistant", "gpt reponse"),
];

export default function useChat(){
    const [messages, setMessages] = useState<IMessage[]>([systemMessage]);

    useEffect(() => {
        if (messages.length <= 1) return;

        let i = messages.length - 1;

        const current = messages[i];
        const next = standardConversation[i + 1];

        if (i == 1) {
            if (current.content != "init") {
                removeMessage(current.id);
                return;
            }
          
            addMessage(next.role, next.content);
            return;
        }

        if (i == 3) {
            if (!current.content) {
                removeMessage(current.id);
                return;
            }

            const splited = current.content.split("/");
            
            if (splited.length!= 2) {
                removeMessage(current.id);
                return;
            }

            addMessage(next.role, next.content);
        }

    }, [messages]);

    const addMessage = (role: IRole, content: string): void => {
      setMessages([...messages, getMessage(role, content)]);
    };

    const updateMessage = (id: string, content: string, error: boolean) => {
        setMessages(c => c.map(message => {
            if(message.id === id){
                return {
                  ...message,
                    content: content,
                    error: error
                }
            }
            return message;
        }));
    }

    const removeMessage = (id: string) => {
        setMessages((c) => c.filter(message => message.id!== id));
    };

    return {
        messages,
        addMessage,
        updateMessage,
        removeMessage
    }
}