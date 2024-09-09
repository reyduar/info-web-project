import React, { useEffect } from "react";
import NoticiasLista from "../components/noticias/NoticiasLista";
import { useGetNoticiasQuery } from "../store/apis/";

function Home() {
  const { data: articulos = [], error, isLoading } = useGetNoticiasQuery();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (articulos) {
      console.log(articulos);
    }
  }, [articulos, error, isLoading]);

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
