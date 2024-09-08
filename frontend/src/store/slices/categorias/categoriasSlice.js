import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
  isLoading: false,
  categoriasErrors: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { loadCategorias, loadCategoriasSuccess, loadCategoriasErrors } =
  categoriasSlice.actions;
