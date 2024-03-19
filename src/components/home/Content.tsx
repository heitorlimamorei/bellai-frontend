import React from 'react';

import CardHome from './CardHome';

export default function Content() {
  return (
    <>
      <div className="lg:hidden flex flex-col items-center w-full ">
        <CardHome title="O que é o Bellai?">
          O bullying está presente em diversos âmbitos da sociedade, sobretudo porque sua origem é
          determinada por uma falha na interação social. Sem dúvida, o convívio ideal é fundamentado
          nos princípios da harmonia e da paz, sabendo que as relações humanas apresentam uma
          finalidade comum: a felicidade da totalidade do corpo social. Contudo, a violação dessa
          concepção pode ser manifestada no bullying, o qual desagrega e rompe as estruturas
          constituintes do bem comum. Logo, a segregação se revela como nociva para a manutenção da
          ordem na conjuntura atual.
        </CardHome>
        <CardHome title="Sobre a origem do bullying">
          O bullying está presente em diversos âmbitos da sociedade, sobretudo porque sua origem é
          determinada por uma falha na interação social. Sem dúvida, o convívio ideal é fundamentado
          nos princípios da harmonia e da paz, sabendo que as relações humanas apresentam uma
          finalidade comum: a felicidade da totalidade do corpo social. Contudo, a violação dessa
          concepção pode ser manifestada no bullying, o qual desagrega e rompe as estruturas
          constituintes do bem comum. Logo, a segregação se revela como nociva para a manutenção da
          ordem na conjuntura atual.
        </CardHome>
        <button className="px-[9rem] mt-5 py-5 rounded-full bg-green-500 w-fit border border-black">
          INICIAR
        </button>
      </div>
      <div className="lg:flex flex-row hidden">
        <div className="flex flex-col items-center justify-between h-full w-[70%]">
          <CardHome title="Sobre a origem do bullying">
            O bullying está presente em diversos âmbitos da sociedade, sobretudo porque sua origem é
            determinada por uma falha na interação social. Sem dúvida, o convívio ideal é
            fundamentado nos princípios da harmonia e da paz, sabendo que as relações humanas
            apresentam uma finalidade comum: a felicidade da totalidade do corpo social. Contudo, a
            violação dessa concepção pode ser manifestada no bullying, o qual desagrega e rompe as
            estruturas constituintes do bem comum. Logo, a segregação se revela como nociva para a
            manutenção da ordem na conjuntura atual.
          </CardHome>
          <CardHome title="O que é a Bellai?">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur nemo impedit id
            et, consectetur cumque aspernatur aliquam obcaecati eius a rerum, fugiat, qui distinctio
            nostrum. Animi ipsam nihil impedit nisi. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Delectus dolores minus temporibus recusandae porro iusto itaque
            consectetur perferendis repellat nam neque minima, eveniet placeat nostrum, reiciendis
            expedita debitis fugiat eos. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptates ut aut cumque quam beatae, repellat cupiditate quaerat aperiam ea sapiente
            consequuntur alias temporibus nulla consequatur dolores? Laudantium accusamus modi
            possimus!
          </CardHome>
          <CardHome title="Sobre a origem do bullying">
            O bullying está presente em diversos âmbitos da sociedade, sobretudo porque sua origem é
            determinada por uma falha na interação social. Sem dúvida, o convívio ideal é
            fundamentado nos princípios da harmonia e da paz, sabendo que as relações humanas
            apresentam uma finalidade comum: a felicidade da totalidade do corpo social. Contudo, a
            violação dessa concepção pode ser manifestada no bullying, o qual desagrega e rompe as
            estruturas constituintes do bem comum. Logo, a segregação se revela como nociva para a
            manutenção da ordem na conjuntura atual.
          </CardHome>
          <button className="px-44 py-9 rounded-full bg-green-500 w-fit border border-black mt-[5rem]">
            INICIAR
          </button>
        </div>
      </div>
    </>
  );
}
