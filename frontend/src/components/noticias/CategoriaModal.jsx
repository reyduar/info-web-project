import React from "react";
import { useForm } from "react-hook-form";

export const CategoriaModal = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    closeModal();
    // Lógica para agregar la categoría
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Agregar Categoría</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-2 mt-1 border rounded"
            />
            {errors.name && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              {...register("description")}
              className="w-full p-2 mt-1 border rounded"
            />
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
              Agregar Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
