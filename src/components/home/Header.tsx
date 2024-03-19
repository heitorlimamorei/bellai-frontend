import React from 'react';

export default function Header() {
  return (
    <nav className="bg-blue-900 flex flex-row px-4 h-[8%] w-screen items-center justify-between font-bold text-white text-2xl">
      <h1 className="font-bold text-white text-2xl flex-grow text-center">
        Bem-vindo ao Bela AI!
      </h1>
      <div className="hidden lg:flex w-[10%] h-fit px-3 py-2 justify-self-end">
        <button className="font-bold text-white hover:bg-blue-950 text-sm rounded-xl border p-3">
          Acesse o chat
        </button>
      </div>
    </nav>
  );
}
