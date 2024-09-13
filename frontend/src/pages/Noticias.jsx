import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TarjetaNoticia, NoResults } from "../components";
import {
  useGetNoticiasByTitleQuery,
  useDeleteArticleMutation,
} from "../store/apis";
import { useAlert } from "../hooks";
import { Alert } from "../components/ui/Alert";

function Noticias() {
  const [alert, triggerAlert] = useAlert();
  const [deleteArticle, { isLoading: isLoadingDeleteArticle }] =
    useDeleteArticleMutation();
  const [searchTerm, setSearchTerm] = useState(null);
  const {
    data: noticias = [],
    error,
    isLoading,
    refetch,
  } = useGetNoticiasByTitleQuery(searchTerm);
  const [messages, setMessages] = useState(null);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const handleCrearNoticia = () => {
    navigate("/crear-noticia");
  };

  const handlerSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    isLoadingDeleteArticle && triggerAlert("warning", "Eliminando noticia...");
    try {
      await deleteArticle(id).unwrap();
      triggerAlert("success", "Noticia eliminada con éxito");
      refetch();
    } catch (err) {
      triggerAlert(
        "error",
        `Error al eliminarla noticia:', ${JSON.stringify(err)}`
      );
    }
  };

  useEffect(() => {
    if (!isLoading && noticias) {
      setArticles(noticias);
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
          <div class="grid grid-cols-1 gap-4 w-full bg-gray-100">
            {alert.message && (
              <Alert type={alert.type} message={alert.message} />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((noticia, index) => (
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
