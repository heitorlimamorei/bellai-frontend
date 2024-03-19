import React from 'react';

import Image from 'next/image';

import { useFormat } from '@/hooks/useFormat';

import Bella from '../../../public/Bella.jpg';
import Profile from '../../../public/Profile.png';
import { IMessage } from './Chat';

export default function ChatMessage(message: IMessage) {
  const formattedContent = useFormat(message);
  return (
    <li className="flex flex-col w-full px-3 mt-7">
      <div className="flex flex-row bg-blue-900 rounded-t-3xl w-fit">
        <Image
          width={40}
          height={20}
          alt="Ai logo"
          src={message.role === 'system' || message.role === 'assistant' ? Bella : Profile}
          className=" rounded-full border-blue-900 border-4"
        />
      </div>
      <div className="bg-blue-900 p-5 rounded-r-3xl rounded-bl-3xl">
        <div className="font-bold self-start ">
          {message.role === 'system' || message.role === 'assistant' ? 'Bella' : 'Você'}
        </div>
        <ul className="mt-2 text-sm mx-2">
          {formattedContent.map((element, index) => (
            <li key={index} className="mt-3 text-[1rem]">
              <React.Fragment key={index}>{element}</React.Fragment>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
