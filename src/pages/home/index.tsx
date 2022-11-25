import React from "react";
import { Nav } from "../../components/Nav";
import undrawOnlineMedia from "../../assets/img/undraw_online_media.svg";
import waves from "../../assets/img/waves.svg";
import imgSignUp from "../../assets/img/undraw_Authentication_re_svpt.png";
import imgSearch from "../../assets/img/procure-disciplinas.png";
import imgLearning from "../../assets/img/undraw_Online_learning_re_qw08.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="leading-normal tracking-normal text-white gradient">
      <Nav />

      <div className="py-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left md:h-96 lg:h-112 xl:h-136">
            <h1 className="my-4 text-5xl text-white font-bold leading-tight">Todo mundo pode aprender</h1>
            <p className="leading-normal text-2xl mb-8 mx-auto md:mx-0">Crie sua conta agora e localize tutores incríveis</p>

            <a href="" onClick={()=>navigate("/sign-up")} className="bg-white cursor-pointer text-indigo-500 font-bold rounded-full py-4 px-8 mx-auto md:mx-0 shadow">Começar agora</a>

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
                Faça seu cadastro
              </h3>
              <p className="text-gray-600 mb-8">
                Você pode se cadastrar como aluno ou como tutor. Se for um aluno, você pode pesquisar por tutores e fazer sua vídeo aula. Se você é um tutor, você pode criar seu perfil e aguardar por vídeo aulas.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img src={imgSignUp} className="w-3/4" alt="Sunset in the mountains" />
            </div>
          </div>
          <div className="flex flex-wrap flex-row-reverse">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Procure disciplinas
              </h3>
              <p className="text-gray-600 mb-8">
                Sendo um aluno, você pode pesquisar por disciplinas e encontrar tutores incríveis.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img src={imgSearch} className="w-3/4" alt="Sunset in the mountains" />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Pronto! Agora é só aproveitar a aula!
              </h3>
              <p className="text-gray-600 mb-8">
                Agora é só aproveitar a aula e aprender muito!
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img src={imgLearning} className="w-3/4" alt="Sunset in the mountains" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { Home };