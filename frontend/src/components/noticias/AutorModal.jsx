import React from "react";
import { useForm } from "react-hook-form";

export const AutorModal = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Aquí enviarías los datos al backend
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 space-y-4 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Crear Autor</h2>

      {/* Nombre completo */}
      <div>
        <label
          htmlFor="full_name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre completo
        </label>
        <input
          type="text"
          id="full_name"
          {...register("full_name", {
            required: "El nombre completo es obligatorio",
            maxLength: 100,
          })}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.full_name ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name.message}</p>
        )}
      </div>

      {/* URL de la imagen */}
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          URL de la Imagen
        </label>
        <input
          type="url"
          id="imageUrl"
          {...register("imageUrl")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email (opcional)
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Twitter */}
      <div>
        <label
          htmlFor="twitter"
          className="block text-sm font-medium text-gray-700"
        >
          Twitter
        </label>
        <input
          type="text"
          id="twitter"
          {...register("twitter", {
            required: "El Twitter es obligatorio",
            maxLength: 100,
          })}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.twitter ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
        />
        {errors.twitter && (
          <p className="text-red-500 text-sm">{errors.twitter.message}</p>
        )}
      </div>

      {/* Biografía */}
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Biografía
        </label>
        <textarea
          id="bio"
          {...register("bio", { required: "La biografía es obligatoria" })}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.bio ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
        />
        {errors.bio && (
          <p className="text-red-500 text-sm">{errors.bio.message}</p>
        )}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
      >
        Crear Autor
      </button>
    </form>
  );
};
