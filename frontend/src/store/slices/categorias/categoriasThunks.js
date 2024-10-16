import {
  loadCategorias,
  loadCategoriasSuccess,
  loadCategoriasErrors,
  setCreateCategoria,
  createCategoriaSuccess,
  createCategoriaErrors,
} from "../../slices/categorias";
import { axiosInstance } from "../../../infrastructure";

export const getCategorias = () => async (dispatch) => {
  try {
    dispatch(loadCategorias());
    const response = await axiosInstance.get("categories/");
    if (response.status === 200) {
      dispatch(loadCategoriasSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(loadCategoriasErrors(error));
  }
};

export const createCategoria = (payload) => async (dispatch) => {
  try {
    dispatch(setCreateCategoria());
    const response = await axiosInstance.post("categories/", payload);
    if (response.status === 201) {
      dispatch(createCategoriaSuccess(response.data));
      dispatch(getCategorias());
    } else {
      alert("Error al crear la categoria");
    }
  } catch (error) {
    dispatch(createCategoriaErrors(error));
  }
};
