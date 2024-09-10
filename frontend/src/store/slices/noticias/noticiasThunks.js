import {
  loadNoticias,
  loadNoticiasSuccess,
  loadNoticiasErrors,
} from "../noticias";
import { axiosInstance } from "../../../infrastructure";

export const getNoticias = () => async (dispatch) => {
  try {
    dispatch(loadNoticias());
    const response = await axiosInstance.get("articles/");
    if (response.status === 200) {
      dispatch(loadNoticiasSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(loadNoticiasErrors(error));
  }
};
