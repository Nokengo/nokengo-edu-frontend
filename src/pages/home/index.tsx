import React from "react";
import { Nav } from "../../components/Nav";
import undrawOnlineMedia from "../../assets/img/undraw_online_media.svg";
import waves from "../../assets/img/waves.svg";
import imgProcureDisciplinas from "../../assets/img/procure-disciplinas.png";

function Home() {
  return (
    <div className="leading-normal tracking-normal text-white gradient">
      <Nav />

      <div className="py-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left md:h-96 lg:h-112 xl:h-136">
            <h1 className="my-4 text-5xl text-white font-bold leading-tight">Todo mundo pode aprender</h1>
            <p className="leading-normal text-2xl mb-8 mx-auto md:mx-0">Crie sua conta agora e localize tutores incríveis</p>

            <a href="https://app.anonaddy.com/register" className="bg-white cursor-pointer text-indigo-500 font-bold rounded-full py-4 px-8 mx-auto md:mx-0 shadow">Começar agora</a>

          </div>
          <div className="w-full md:w-3/5 py-6 flex justify-center md:min-h-full">
            <img src={undrawOnlineMedia} className="w-full lg:w-4/5" alt="Vite logo" />
          </div>
        </div>
      </div>

      <div className="relative -mt-12 lg:-mt-24">
        <img src={waves} />
      </div>

      <section className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Title
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Procure disciplinas
              </h3>
              <p className="text-gray-600 mb-8">
                Selecione a disciplina que precisa daquela ajudinha<br /> e vamos te mostrar
                os melhores tutores disponíveis<br /> para te ajudar.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img src={imgProcureDisciplinas} className="w-3/4" alt="Sunset in the mountains" />
            </div>
          </div>
          <div className="flex flex-wrap flex-row-reverse">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Procure disciplinas
              </h3>
              <p className="text-gray-600 mb-8">
                Selecione a disciplina que precisa daquela ajudinha<br /> e vamos te mostrar
                os melhores tutores disponíveis<br /> para te ajudar.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img src={imgProcureDisciplinas} className="w-3/4" alt="Sunset in the mountains" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { Home };