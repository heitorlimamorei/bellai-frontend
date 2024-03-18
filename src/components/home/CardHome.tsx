import React from 'react';

interface CardHomeProps {
  title: string;
  children: string;
}

export default function CardHome(props: CardHomeProps) {
  return (
    <>
      <div className="bg-blue-900 m-2 rounded-2xl text-justify text-sm p-5 lg:hidden flex flex-col">
        <h1 className="font-bold text-2xl mb-2 font-serif">{props.title}</h1>
        <p>{props.children}</p>
      </div>
      <div className="hidden lg:flex flex-column mt-8 p-4 w-full h-fit-content bg-blue-900 rounded-r-3xl shadow-black shadow-lg">
        <div className="w-[20%]">
          <h1 className="text-white font-serif text-2xl text-left mr-8">
            {props.title}
          </h1>
        </div>
        <div className="w-[80%] jusify-self-end">
          <p className="text-white">{props.children}</p>
        </div>
      </div>
    </>
  );
}
