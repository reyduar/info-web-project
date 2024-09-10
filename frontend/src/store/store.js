import { configureStore } from "@reduxjs/toolkit";
import { categoriasSlice } from "./slices/categorias";
import { noticiasSlice } from "./slices/noticias";
import { userSlice } from "./slices/user/userSlice";
import { noticiasApi, autorApi } from "./apis";
export const store = configureStore({
  reducer: {
    categoria: categoriasSlice.reducer,
    noticia: noticiasSlice.reducer,
    userInfo: userSlice.reducer,
    [noticiasApi.reducerPath]: noticiasApi.reducer,
    [autorApi.reducerPath]: autorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noticiasApi.middleware, autorApi.middleware),
});
