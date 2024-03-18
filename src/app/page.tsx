'use client';
import Image from 'next/image';
import InputMessage from '@/components/chat/InputMessage';
import ChatScreen from '@/components/chat/ChatScreen';

export default function Home() {
  return (
    <main className="flex h-screen w-screen bg-gray-300 flex-col">
      <ChatScreen></ChatScreen>
    </main>
  );
}
