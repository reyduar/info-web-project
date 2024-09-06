import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function CrearUsuario() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const payload = { username: email, password: password };
    try {
      const response = await api.post("user/register/", payload);
      if (response.status === 201) {
        navigate("/register");
      } else {
        alert("Error al registrar el nuevo usuario");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password", "");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email no es válido",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password es obligatorio",
                minLength: {
                  value: 6,
                  message: "Password debe tener al menos 6 caracteres",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirmar Password */}
          <div>
            <label
              className="block mb-1 font-medium"
              htmlFor="confirm_password"
            >
              Confirmar Password
            </label>
            <input
              id="confirm_password"
              type="password"
              {...register("confirm_password", {
                required: "Confirmar password es obligatorio",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              className={`w-full px-4 py-2 border ${
                errors.confirm_password ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-[#007ACC] hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CrearUsuario;
