import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../infrastructure";
import { ACCCESS_TOKEN, REFRESH_TOKEN, USERNAME } from "../config/constants";
import { loadUserInfo } from "../store/slices/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (loading) {
      return;
    }
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axiosInstance.post("token/", {
        username: email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        const username = loadUserInfo(email.split("@")[0]);
        localStorage.setItem(USERNAME, username.payload);
        navigate("/");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      navigate("/login");
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#007ACC] text-white font-semibold rounded-md hover:bg-[#005f99] transition"
          >
            {loading ? "Inciando Sesión.." : "Iniciar Sesión"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/crear-usuario" className="text-[#007ACC] hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
