import React, { useState } from "react";

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

function NoticiasLista() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNoticias = noticiasData.filter((noticia) =>
    noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por título"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNoticias.map((noticia, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <p className="text-sm text-gray-500">{noticia.categoria}</p>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {noticia.titulo}
            </h2>
            <p className="text-gray-700">{noticia.contenido}</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                {noticia.fechaPublicacion}
              </p>
              <p className="text-gray-500 text-sm">por {noticia.autor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticiasLista;
