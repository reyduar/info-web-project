import React from "react";

import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-[#007ACC] text-white p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={`${process.env.PUBLIC_URL}/favicon.png`}
          alt="Logo"
          className="h-10 w-10 mr-2"
        />
        <h1 className="text-3xl font-semibold">pOc Software v1.0</h1>
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
