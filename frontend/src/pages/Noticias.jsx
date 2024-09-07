import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TarjetaNoticia } from "../components";
import api from "../api";

const noticiasData = [
  {
    categoria: "Tecnología",
    titulo: "Nuevo lanzamiento de smartphone",
    contenido:
      "Se ha lanzado un nuevo smartphone con características innovadoras...",
    fechaPublicacion: "2024-08-31",
    autor: "Juan Pérez",
  },
  {
    categoria: "Economía",
    titulo: "Análisis del mercado bursátil",
    contenido:
      "El mercado bursátil ha tenido una semana agitada con movimientos importantes...",
    fechaPublicacion: "2024-08-30",
    autor: "María Gómez",
  },
  // Agrega más noticias según sea necesario
];

function Noticias() {
  const [articles, setArticles] = useState(noticiasData);
  const [articlesFiltered, setArticlesFiltered] = useState(noticiasData);
  const navigate = useNavigate();

  const handleCrearNoticia = () => {
    navigate("/crear-noticia");
  };

  const handlerSearch = (e) => {
    const searchTerm = e.target.value;
    setArticlesFiltered(
      articles.filter((noticia) =>
        noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getArticles = async () => {
    try {
      const response = await api.get("articles/");
      if (response.status === 200) {
        console.log(response.data);
        setArticles(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (article) => {
    try {
      const response = await api.delete(`articles/delete/${article.id}}/`);
      if (response.status === 204) {
        getArticles();
      } else {
        alert("Error al eliminar el articulo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Noticias</h1>
        <button
          onClick={handleCrearNoticia}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Noticia
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por título"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm"
          onChange={(e) => handlerSearch(e)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articlesFiltered.map((noticia, index) => (
          <TarjetaNoticia
            key={index}
            noticia={noticia}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Noticias;
