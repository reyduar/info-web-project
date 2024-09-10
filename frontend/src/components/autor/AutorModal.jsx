import React from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";
import { Alert } from "../ui/Alert";
import { useCreateAuthorMutation, useGetAuthorsQuery } from "../../store/apis";

export const AutorModal = ({ closeModal }) => {
  const [alert, triggerAlert] = useAlert();
  const [createAuthor, { isLoading, error }] = useCreateAuthorMutation();
  const { refetch } = useGetAuthorsQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    isLoading && triggerAlert("warning", "Creando nuevo autor...");
    try {
      await createAuthor({ ...data }).unwrap();
      reset();
      triggerAlert("success", "El autor se ha creado correctamente");
      refetch();
    } catch (err) {
      triggerAlert("error", `Error al crear el autor: ${error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Agregar Autor</h2>
        {/* Mostrar la alerta si está activa */}
        {alert.message && <Alert type={alert.type} message={alert.message} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre completo */}
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
