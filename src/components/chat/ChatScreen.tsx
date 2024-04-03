'use client';
import useChat from '@/hooks/useChat';

import Chat from './Chat';
import InputMessage from './InputMessage';

export default function ChatScreen() {
  const { messages, addMessage } = useChat();

  const handleSubmit = (messageContent: string) => {
    addMessage('user', messageContent);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Chat messages={messages}></Chat>
      <InputMessage onSubmit={handleSubmit}></InputMessage>
    </div>
  );
}
