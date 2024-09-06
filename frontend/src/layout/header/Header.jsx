import React from "react";

import { FaArtstation } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-[#007ACC] text-white p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <FaArtstation className="text-3xl mr-4" />
        <h1 className="text-3xl font-semibold">Portal de Noticias</h1>
      </div>
      <div className="relative">
        <button
          onClick={() => navigate("/logout")}
          className="flex items-center text-white focus:outline-none"
        >
          <FaPowerOff className="text-2xl" />
        </button>
      </div>
    </header>
  );
};
