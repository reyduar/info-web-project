import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaNewspaper } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6 shadow-lg">
      <div className="flex flex-col h-full bg-gray-800 text-white">
        {/* Contenido del sidebar */}
        <div className="flex-grow">
          <nav>
            <ul>
              <li className="mb-4">
                <Link
                  to="/"
                  className="block py-2 px-4 rounded hover:bg-gray-600 transition flex items-center"
                >
                  <FaHome className="mr-2" /> Inicio
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/noticias"
                  className="block py-2 px-4 rounded hover:bg-gray-600 transition flex items-center"
                >
                  <FaNewspaper className="mr-2" /> Noticias
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Sección del Avatar */}
        <div className="flex items-center p-4">
          <Link to="/perfil" className="flex items-center space-x-3">
            <img
              src="https://static.vecteezy.com/system/resources/previews/021/155/837/non_2x/cat-face-side-view-close-up-portrait-suitable-for-avatar-web-user-profile-print-sticker-poster-and-more-illustration-vector.jpg"
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-white font-semibold">Albert Fest</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
