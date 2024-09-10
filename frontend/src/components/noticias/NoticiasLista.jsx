import React, { useState, useEffect } from "react";
import { SimpleTarjetaNoticia } from "./TarjetaNoticia";
import { useGetNoticiasQuery } from "../../store/apis";

function NoticiasLista() {
  const { data: noticias = [], error, isLoading } = useGetNoticiasQuery();
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
    if (!isLoading && noticias) {
      setArticles(noticias);
      setArticlesFiltered(noticias);

      setMessages(null);
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
          <SimpleTarjetaNoticia key={index} noticia={noticia} />
        ))}
      </div>
    </div>
  );
}

export default NoticiasLista;
