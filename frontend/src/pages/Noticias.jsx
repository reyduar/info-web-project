import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TarjetaNoticia } from "../components";
import { getNoticias } from "../store/slices/noticias";
import api from "../api";

function Noticias() {
  const dispatch = useDispatch();
  const {isLoading, noticias, errors} = useSelector((state) => state.noticia);
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
      const response = await api.delete(`articles/delete/${parseInt(id)}/`);
      if (response.status === 204) {
        dispatch(getNoticias())
      } else {
        alert("Error al eliminar el articulo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getNoticias()); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(!isLoading && noticias) {
      setArticles(noticias);
      setArticlesFiltered(noticias);
      setMessages(null);
    }

    if(isLoading) {
      setMessages("Cargando noticias...");
    }

    if(errors) {
      setMessages("Error al cargar noticias");
    }
    
  }, [noticias, isLoading, errors]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Noticias</h1>
        {messages && <h1 className="text-2xl font-bold">{messages}</h1>}
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
