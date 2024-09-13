import React from "react";
import NoticiasLista from "../components/noticias/NoticiasLista";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Bienvenido al buscador de noticias
        </h2>
        <button
          onClick={() => navigate("/noticias")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Admin
        </button>
      </div>
      <NoticiasLista />
    </div>
  );
}

export default Home;
