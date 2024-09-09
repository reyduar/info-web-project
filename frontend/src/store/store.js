import { configureStore } from "@reduxjs/toolkit";
import { categoriasSlice } from "./slices/categorias";
import { noticiasSlice } from "./slices/noticias";
import { userSlice } from "./slices/user/userSlice";
export const store = configureStore({
  reducer: {
    categoria: categoriasSlice.reducer,
    noticia: noticiasSlice.reducer,
    userInfo: userSlice.reducer,
  },
});
