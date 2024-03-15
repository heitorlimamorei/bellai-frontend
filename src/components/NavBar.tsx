import React from "react";

export default function NavBar() {
  return (
      <nav className="bg-blue-800 hidden lg:flex flex-row h-[8%] w-screen">
        <div className="flex w-full justify-end self-center justify-self-center">
          <h1 className="font-bold text-white text-2xl">
            Bem-vindo ao Bela AI!
          </h1>
        </div>
        <div className="flex justify-end items-center w-[70%] h-full">
          <button className="font-bold p-2 text-white mr-4 hover:bg-blue-900 text-sm rounded-2xl justify-self-end">
            Acesse o chat
          </button>
        </div>
      </nav>
  );
}
