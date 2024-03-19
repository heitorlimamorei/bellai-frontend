import React, { useState } from 'react';
import Chat, { IMessage } from './Chat';
import InputMessage from './InputMessage';

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      role: 'system',
      content:
        'Olá, sou a Bella! Estou aqui para ajudar você a lidar com o bullying e oferecer apoio durante este desafio',
    },
  ]);

  const handleSubmit = (messageContent: string) => {
    const newMessage: IMessage = { role: 'user', content: messageContent };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Chat messages={messages}></Chat>
      <InputMessage onSubmit={handleSubmit}></InputMessage>
    </div>
  );
}
