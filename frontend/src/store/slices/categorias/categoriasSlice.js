import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
  isLoading: false,
  categoriasErrors: null,
  setCreateCategoria: null,
  createCategoriaSuccess: null,
  isLoadingCreateCategoria: false,
  createCategoriaErrors: null,
};

export const categoriasSlice = createSlice({
  name: "categoria",
  initialState,
  reducers: {
    loadCategorias: (state, action) => {
      state.isLoading = true;
      state.categoriasErrors = null;
    },
    loadCategoriasSuccess: (state, action) => {
      state.categorias = action.payload;
      state.isLoading = false;
    },
    loadCategoriasErrors: (state, action) => {
      state.categoriasErrors = action.payload;
      state.isLoading = false;
    },
    setCreateCategoria: (state) => {
      state.isLoadingCreateCategoria = true;
      state.createCategoriaErrors = null;
      state.createCategoriaSuccess = null;
    },
    createCategoriaSuccess: (state, action) => {
      state.createCategoriaSuccess = action.payload;
      state.isLoadingCreateCategoria = false;
    },
    createCategoriaErrors: (state, action) => {
      state.createCategoriaErrors = action.payload;
      state.isLoadingCreateCategoria = false;
      state.createCategoria = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadCategorias,
  loadCategoriasSuccess,
  loadCategoriasErrors,
  setCreateCategoria,
  createCategoriaSuccess,
  createCategoriaErrors,
} = categoriasSlice.actions;
