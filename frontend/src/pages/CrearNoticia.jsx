import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AutorModal, CategoriaModal, EditorContenido } from "../components";
import { getCategorias } from "../store/slices/categorias";
import {
  useGetAuthorsQuery,
  useCreateArticleMutation,
  useGetNoticiasQuery,
} from "../store/apis";
import { useAlert } from "../hooks";
import { Alert } from "../components/ui/Alert";

function CrearNoticia() {
  const {
    data: autores = [],
    error: autoresErrors,
    isLoading: isLoadingAutores,
  } = useGetAuthorsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    categorias = [],
    isLoading: isLoadingCategorias,
    categoriasErrors,
  } = useSelector((state) => state.categoria);
  const [alert, triggerAlert] = useAlert();
  const [createArticle, { isLoading: isLoadingCreateArticle }] =
    useCreateArticleMutation();
  const { refetch } = useGetNoticiasQuery();
  const [categoryMessages, setCategoryMessages] = useState(null);
  const [autorMessages, setAutorMessages] = useState(null);
  const [isCategoriaModalOpen, setCategoriaIsModalOpen] = useState(false);
  const [isAutorModalOpen, setAutorIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    isLoadingCreateArticle &&
      triggerAlert("warning", "Creando nueva noticia...");
    try {
      await createArticle({ ...data }).unwrap();
      reset();
      triggerAlert("success", "Noticia creada correctamente");
      refetch();
    } catch (err) {
      triggerAlert(
        "error",
        `Error al crear la noticia: ${JSON.stringify(err)}`
      );
    }
  };

  const openCategoriaModal = () => {
    setCategoriaIsModalOpen(true);
  };

  const closeCategoriaModal = () => {
    setCategoriaIsModalOpen(false);
  };

  const openAutorModal = () => {
    setAutorIsModalOpen(true);
  };

  const closeAutorModal = () => {
    setAutorIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getCategorias()); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoadingCategorias && categorias) {
      setCategoryMessages("Seleccione una categoria");
    }

    if (isLoadingCategorias) {
      setCategoryMessages("Cargando categorias...");
    }

    if (categoriasErrors) {
      setCategoryMessages("Error al cargar categorias");
    }
  }, [categorias, isLoadingCategorias, categoriasErrors]);

  useEffect(() => {
    if (!isLoadingAutores && autores) {
      setAutorMessages("Seleccione un autor");
    }

    if (isLoadingAutores) {
      setAutorMessages("Cargando autores...");
    }

    if (autoresErrors) {
      setAutorMessages("Error al cargar los autores");
    }
  }, [autores, isLoadingAutores, autoresErrors]);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => navigate("/noticias")}
          className="mb-4 text-blue-500 hover:underline"
        >
          &larr; Volver al listado de noticias
        </button>
        <h2 className="text-2xl font-bold mb-6">Crear Noticia</h2>
        {alert.message && <Alert type={alert.type} message={alert.message} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full p-2 mt-1 border rounded"
            />
            {errors.title && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoría</label>
            <div className="flex">
              <select
                {...register("category", { required: true })}
                className="w-full p-2 mt-1 border rounded"
              >
                <option value="">{categoryMessages}</option>
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria.id}>
                    {categoria.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={openCategoriaModal}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +
              </button>
            </div>
            {errors.category && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Autor</label>
            <div className="flex">
              <select
                {...register("author", { required: true })}
                className="w-full p-2 mt-1 border rounded"
              >
                <option value="">{autorMessages}</option>
                {autores.map((autor, index) => (
                  <option key={index} value={autor.id}>
                    {autor.full_name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={openAutorModal}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +
              </button>
            </div>
            {errors.category && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Contenido</label>
            <textarea
              {...register("content", { required: true })}
              className="w-full p-2 mt-1 border rounded"
            />
            {errors.content && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Contenido
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <EditorContenido
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.content && (
              <span className="text-red-500">El contenido es obligatorio</span>
            )}
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Fecha de Publicación</label>
            <input
              type="date"
              {...register("publishDate", { required: true })}
              className="w-full p-2 mt-1 border rounded"
            />
            {errors.publishDate && (
              <span className="text-red-500">Este campo es obligatorio</span>
            )}
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Crear Noticia
          </button>
        </form>
      </div>
      {isCategoriaModalOpen && (
        <CategoriaModal closeModal={closeCategoriaModal} />
      )}
      {isAutorModalOpen && <AutorModal closeModal={closeAutorModal} />}
    </div>
  );
}

export default CrearNoticia;
