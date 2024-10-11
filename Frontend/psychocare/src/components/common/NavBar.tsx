const NavBar: React.FC = () => {
  return (
    <div className="flex w-36 min-h-screen bg-gradient-to-tl from-slate-400 to-emerald-400">
      <div className=" flex justify-center mt-12">
        <div className="flex flex-col gap-6 p-2">
          <div>
            <button className=" w-32 h-10 bg-zinc-600 text-white rounded-md shadow-lg transform transition-transform duration-150 active:scale-95 active:shadow-none">
              Home
            </button>
          </div>
          <div>
            <button className="w-32 h-10 bg-zinc-600 text-white rounded-md shadow-lg transform transition-transform duration-150 active:scale-95 active:shadow-none">
              Agenda
            </button>
          </div>
          <div>
            <button className="w-32 h-10 bg-zinc-600 text-white rounded-md shadow-lg transform transition-transform duration-150 active:scale-95 active:shadow-none">
              Pastas
            </button>
          </div>
          <div>
            <button className="w-32 h-10 bg-zinc-600 text-white rounded-md shadow-lg transform transition-transform duration-150 active:scale-95 active:shadow-none">
              Cadastros
            </button>
          </div>
          <div>
            <button className="w-32 h-10 bg-zinc-600 text-white rounded-md shadow-lg transform transition-transform duration-150 active:scale-95 active:shadow-none">
              Financeiro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
