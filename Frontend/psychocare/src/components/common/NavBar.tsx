const NavBar: React.FC = () => {
  return (
    <div className="flex bg-green-200 w-36 min-h-screen">
      <div className=" flex justify-center">
        <div className="flex flex-col gap-6 p-3">
          <div>
            <button className=" w-32 h-10 bg-zinc-600 text-white rounded-md">
              Home
            </button>
          </div>
          <div>
            <button className="w-32 h-10 bg-zinc-600 text-white rounded-md">
              Agenda
            </button>
          </div>
          <div>
            <button className="w-32 h-10 bg-zinc-600 text-white">Pastas</button>
          </div>
          <div>
            <button className="w-32 h-10 bg-zinc-600 text-white">
              Cadastros
            </button>
          </div>
          <div>
            <button className="w-32 h-10 bg-zinc-600 text-white">
              Financeiro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
