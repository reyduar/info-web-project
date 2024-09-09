import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticias } from "../../store/slices/noticias";
import { SimpleTarjetaNoticia } from "./TarjetaNoticia";



function NoticiasLista() {
  const dispatch = useDispatch();
  const {isLoading, noticias, errors} = useSelector((state) => state.noticia);
  const [messages, setMessages] = useState(null);
  const [articles, setArticles] = useState([]);
  const [articlesFiltered, setArticlesFiltered] = useState([]);

  const handlerSearch = (e) => {
    const searchTerm = e.target.value;
    setArticlesFiltered(
      articles.filter((noticia) =>
        noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
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
        {messages && <h3 className="text-2xl font-bold">{messages}</h3>}
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
          <SimpleTarjetaNoticia
            key={index}
            noticia={noticia}
          />
        ))}
      </div>
    </div>
  );
}

export default NoticiasLista;
