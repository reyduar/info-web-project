import React from "react";
import { MdSearchOff } from "react-icons/md";

export const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      <MdSearchOff className="w-16 h-16 mb-4 text-gray-400" />
      <p className="text-gray-500 text-lg">
        No se encontraron resultados de noticias
      </p>
    </div>
  );
};
