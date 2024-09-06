import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mt-4">
          Página no encontrada
        </p>
        <p className="text-gray-600 mt-2">
          Lo siento, la página que estas buscando no existe.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
