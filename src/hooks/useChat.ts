/* eslint-disable */
import { useEffect, useState } from 'react';

import IMessage from '@/types/message';
import { v4 as uuidv4 } from 'uuid';

type IRole = 'user' | 'system' | 'assistant';

function getMessage(role: IRole, content: string): IMessage {
  return {
    id: uuidv4(),
    content: content,
    role: role,
  };
}

const baseprompt =
  'Atue com um psicologo (homem) experiente focado em atender jovens estudantes de uma escola particular de alta renda em que é frequente a ocorrencia de casos de bullying e de assedio emocional. Agora atenda um estudante com o seguinte relato: ';

const systemMessage = getMessage('system', 'Olá, sou a Bella! Estou aqui para ajudar você a lidar com o bullying e oferecer apoio durante este desafio');

const standardConversation = [
  systemMessage,
  getMessage('user', 'começar'),
  getMessage('assistant', 'Sobre qual sala (ano/letra) estamos falando ?'),
  getMessage('user', '3/a'),
  getMessage('assistant', 'Me conte o que está acontecendo'),
  getMessage('user', 'blablablabla'),
  getMessage('assistant', 'gpt reponse'),
];

export default function useChat() {
  const [messages, setMessages] = useState<IMessage[]>([systemMessage]);

  useEffect(() => {
    if (messages.length <= 1) return;

    let i = messages.length - 1;

    const current = messages[i];
    const next = standardConversation[i + 1];

    if (i == 1) {
      if (current.content != 'começar') {
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

      const splited = current.content.split('/');

      console.log(splited);

      if (splited.length != 2) {
        removeMessage(current.id);
        return;
      }

      addMessage(next.role, next.content);
      return;
    }
  }, [messages]);

  const addMessage = (role: IRole, content: string): void => {
    const nextI = messages.length;
    setMessages([...messages, getMessage(role, content)]);
    if (nextI >= 4 && role == "user") {
      sendToBff(getMessage(role, content));
    }
  };

  const updateMessage = (id: string, content: string, error: boolean) => {
    setMessages((c) =>
      c.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            content: content,
            error: error,
          };
        }
        return message;
      }),
    );
  };

  const removeMessage = (id: string) => {
    setMessages((c) => c.filter((message) => message.id !== id));
  };

  const sendToBff = async (message: IMessage) => {
    try {
      let lastI = messages.length -1;
      let messageF: IMessage = {
        ...message,
        content: `${lastI == 4 ? baseprompt : ""} ${message.content}`,
      };

      const messagesF = [...messages, messageF].map((message) => ({
        role: message.role,
        content: message.content,
      }));
      await fetch('api/openAi', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          conversation: messagesF,
          model: 'gpt-4',
        }),
      }).then(async (reponse: any) => {
        const reader = reponse.body?.getReader();
        const nextId = uuidv4();

        setMessages((prev) => {
          return [
            ...prev,
            {
              id: nextId,
              role: 'assistant',
              content: '',
            },
          ];
        });

        let lastChuck = '';

        while (true) {
          const { value, done } = await reader?.read();

          if (done) {
            break;
          }

          let currentChunck = new TextDecoder().decode(value);
          if (currentChunck != null) {
            setMessages((prev) => {
              let messages = [...prev];
              let i = messages.findIndex((m) => m.id === nextId);
              let message = messages[i];

              if (message != null) {
                if (currentChunck != lastChuck) {
                  message.content = message.content.concat(currentChunck);
                  messages[i] = message;
                }
                lastChuck = currentChunck;
              }
              return messages;
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    messages,
    addMessage,
    updateMessage,
    removeMessage,
  };
}
