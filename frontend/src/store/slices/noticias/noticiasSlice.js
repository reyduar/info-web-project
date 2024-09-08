import { createSlice } from "@reduxjs/toolkit";

export const noticiasSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: "noticia",
  initialState: {
    noticias: [],
    isLoading: false,
    errors: null,
  },
  reducers: {
    addNoticia: (state, action) => {
      state.noticias = [...state.noticias, action.payload];
    },
    deleteNoticia: (state, action) => {
      state.noticias = state.noticias.filter(
        (noticia) => noticia.id !== action.payload
      );
    },
    loadNoticias: (state) => {
      state.isLoading = true;
    },
    loadNoticiasSuccess: (state, action) => {
      state.noticias = action.payload;
      state.isLoading = false;
    },
    loadNoticiasErrors: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  addNoticia,
  deleteNoticia,
  loadNoticias,
  loadNoticiasSuccess,
  loadNoticiasErrors,
} = noticiasSlice.actions;
