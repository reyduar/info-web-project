import {
  loadNoticias,
  loadNoticiasSuccess,
  loadNoticiasErrors,
} from "../noticias";
import api from "../../../api";

export const getNoticias = () => async (dispatch) => {
  try {
    dispatch(loadNoticias());
    const response = await api.get("articles/");
    if (response.status === 200) {
      dispatch(loadNoticiasSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(loadNoticiasErrors(error));
  }
};
