import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl">Sem permissão para acessar o conteúdo</h1>
    </div>
  );
};

export default Unauthorized;
