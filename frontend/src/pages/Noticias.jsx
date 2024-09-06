import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TarjetaNoticia } from "../components";

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
  {
    categoria: "Economía",
    titulo: "Análisis del mercado bursátil",
    contenido:
      "El mercado bursátil ha tenido una semana agitada con movimientos importantes...",
    fechaPublicacion: "2024-08-30",
    autor: "María Gómez",
  },
  {
    categoria: "Economía",
    titulo: "Análisis del mercado bursátil",
    contenido:
      "El mercado bursátil ha tenido una semana agitada con movimientos importantes...",
    fechaPublicacion: "2024-08-30",
    autor: "María Gómez",
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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredNoticias = noticiasData.filter((noticia) =>
    noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCrearNoticia = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para registrar al usuario
    // Por ejemplo, redirigir al usuario al login después del registro
    navigate("/crear-noticia");
  };

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNoticias.map((noticia, index) => (
          <TarjetaNoticia key={index} noticia={noticia} />
        ))}
      </div>
    </div>
  );
}

export default Noticias;
