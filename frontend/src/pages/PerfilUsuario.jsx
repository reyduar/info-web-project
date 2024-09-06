import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const PerfilUsuario = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    console.log("User Data:", data);
    // Aquí puedes manejar la actualización del perfil
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        {/* Email (No editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            disabled
            defaultValue="usuario@ejemplo.com"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        {/* Cambiar Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nueva Contraseña
          </label>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Por favor, confirme su contraseña",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Subir Foto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Foto de Perfil
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Vista previa de la imagen"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Botón de Enviar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerfilUsuario;
