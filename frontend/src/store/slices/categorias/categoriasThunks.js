import {
  loadCategorias,
  loadCategoriasSuccess,
  loadCategoriasErrors,
} from "../../slices/categorias";
import api from "../../../api";

export const getCategorias = () => async (dispatch) => {
  try {
    dispatch(loadCategorias());
    const response = await api.get("categories/");
    if (response.status === 200) {
      dispatch(loadCategoriasSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(loadCategoriasErrors(error));
  }
};
