import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import CrearUsuario from "./pages/CrearUsuario";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import PerfilUsuario from "./pages/PerfilUsuario";
import CrearNoticia from "./pages/CrearNoticia";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/router/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function Register() {
  localStorage.clear();
  return <Navigate to="/crear-usuario" />;
}

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="crear-noticia" element={<CrearNoticia />} />
            <Route path="perfil" element={<PerfilUsuario />} />
            {/* Otras rutas aquí */}
          </Route>
          <Route path="*" element={<NotFound />} /> {/* Ruta NotFound */}
          <Route path="/login" element={<Login />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
