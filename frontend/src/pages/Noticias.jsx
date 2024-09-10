import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TarjetaNoticia, NoResults } from "../components";
import { getNoticias } from "../store/slices/noticias";
import { axiosInstance } from "../infrastructure";
import { useGetNoticiasQuery } from "../store/apis";

function Noticias() {
  const dispatch = useDispatch();
  // const { isLoading, noticias, errors } = useSelector((state) => state.noticia);
  const { data: noticias = [], error, isLoading } = useGetNoticiasQuery();
  const [messages, setMessages] = useState(null);
  const [articles, setArticles] = useState([]);
  const [articlesFiltered, setArticlesFiltered] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `articles/delete/${parseInt(id)}/`
      );
      if (response.status === 204) {
        dispatch(getNoticias());
      } else {
        alert("Error al eliminar el articulo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading && noticias) {
      setArticles(noticias);
      setArticlesFiltered(noticias);
      setMessages(noticias.length > 0 ? "Noticias" : "");
    }

    if (isLoading) {
      setMessages("Cargando noticias...");
    }

    if (error) {
      setMessages("Error al cargar noticias");
    }
  }, [noticias, isLoading, error]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        {messages && <h1 className="text-2xl font-bold">{messages}</h1>}
        <button
          onClick={handleCrearNoticia}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Noticia
        </button>
      </div>
      {noticias.length > 0 ? (
        <div>
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
      ) : (
        <NoResults />
      )}
    </div>
  );
}

export default Noticias;
