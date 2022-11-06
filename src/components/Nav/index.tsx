export const Nav = () => {
  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white" style={{ backgroundColor: '#019fe2' }}>
      {/* <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"> */}
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <a className="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
            nokengo
          </a>
        </div>

        <div className="w-full lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
          <button
            id="navAction"
            className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Entrar
          </button>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};