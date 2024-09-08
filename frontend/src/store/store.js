import { configureStore } from "@reduxjs/toolkit";
import { categoriasSlice } from "./slices/categorias";
import { noticiasSlice } from "./slices/noticias";
export const store = configureStore({
  reducer: {
    categoria: categoriasSlice.reducer,
    noticia: noticiasSlice.reducer,
  },
});
