import React from "react";
import NoticiasLista from "../components/noticias/NoticiasLista";

function Home() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Bienvenido al Portal de Noticias
      </h2>
      <p className="text-gray-700">
        Este es el contenido principal donde se mostrarán las noticias. Puedes
        personalizar este espacio para mostrar artículos, imágenes y más
        información relevante para tus usuarios.
      </p>
      <NoticiasLista />
    </div>
  );
}

export default Home;
