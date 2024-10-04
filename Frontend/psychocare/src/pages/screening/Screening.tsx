const Screening: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-200 justify-center items-center min-w-screen min-h-screen p-4">
      <form className="flex flex-col bg-yellow-100 w-2/5 h-112 items-center p-4 gap-2">
        <h2>Triagem de pacientes</h2>
        <div className="bg-pink-200 p-2">
          <div>
            <div className="flex flex-row">
              <h2 className="m-2">Nome:</h2>
              <input
                type="Nome"
                placeholder="Nome"
                required
                className="w-full mb-4 p-2 border rounded"
              />
            </div>
            <div className="flex flex-row">
              <h2 className="m-2">Data de Nascimento:</h2>
              <input
                type="Birthdate"
                placeholder="Data de Nascimento"
                required
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="Age"
                placeholder="Idade"
                disabled
                className="w-full mb-4 mr-4 ml-4 p-2 border rounded bg-white"
              />
            </div>
            <div className="flex flex-row">
              <h2 className="m-2">Telefone:</h2>
              <input
                type="Phone"
                placeholder="Telefone"
                required
                className="w-full mb-4 p-2 border rounded"
              />
            </div>
            <div className="flex flex-row">
              <h2 className="m-2">Observações:</h2>
              <input
                type="Observations"
                placeholder="Observações"
                required
                className="w-full h-20 mb-4 p-2 border rounded"
              />
            </div>
          </div>
        </div>
        <div className="bg-green-200 p-2">
          <div>
            <div className="flex flex-row">
              <h2>Interesse em realizar a consulta:</h2>
              <div className="flex flex-row space-y-2">
                <label className="flex flex-row items-center">
                  <span className="ml-2 text-gray-700">Sim</span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </label>

                <label className="flex flex-row items-center">
                  <span className="ml-2 text-gray-700">Não</span>
                  <input
                    type="checkbox"
                    className="flex form-checkbox h-5 w-5 text-blue-600 rounded-full"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-row">
              <h2>Urgência:</h2>
              <div className="flex flex-row space-y-2">
                <label className="flex flex flex-row items-center">
                  <span className="ml-2 text-gray-700">Sim</span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </label>

                <label className="flex flex-row items-center">
                  <span className="ml-2 text-gray-700">Não</span>
                  <input
                    type="checkbox"
                    className="flex form-checkbox h-5 w-5 text-blue-600 rounded-full"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row">
              <h2 className="m-2">Observações:</h2>
              <input
                type="Observations"
                placeholder="Observações"
                required
                className="w-full h-20 mb-4 p-2 border rounded"
              />
            </div>
          </div>
        </div>
        <div className="bg-blue-200 p-2">
          <div>
            <button type="submit" className="w-full bg-teal-400 p-2 rounded">
              Encaminhar para estagiário
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Screening;
