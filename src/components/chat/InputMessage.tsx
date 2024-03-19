import React, { useState } from 'react';

import Button from '../Button';
import { IconSend } from '../Icons';
import Textarea from '../Textarea';

interface InputMessageProps {
  onSubmit: any;
}

export default function InputMessage(props: InputMessageProps) {
  const [inputValue, setInputValue] = useState('');

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setInputValue(inputValue + '\n');
    } else if (event.key === 'Enter' && event.shiftKey) {
    }
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    props.onSubmit(inputValue);
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="w-full px-3 sm:px-20 lg:px-72 self-end  text-white">
      <div className=" flex flex-row bg-blue-900 self-end mb-6 w-full rounded-2xl border-[1px] p-3 border-zinc-600">
        <Textarea
          onKeyPress={handleKeyPress}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Escreva aqui sua mensagem"
          style="bg-transparent w-full h-[3rem] outline-none p-2 resize-none"
        />
        <Button onClick={handleSubmit} icon={IconSend()} style="w-fit py-2" />
      </div>
    </div>
  );
}
