import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../infrastructure";

export const autorApi = createApi({
  reducerPath: "autorApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `/authors`,
  }),
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: () => ({ url: "/", method: "GET" }),
    }),
    createAuthor: builder.mutation({
      query: (newAuthor) => ({
        url: "/",
        method: "POST",
        data: newAuthor,
      }),
    }),
    deleteAuthor: builder.mutation({
      query: (authorId) => ({
        url: `/${authorId}/`,
        method: "DELETE",
      }),
    }),
    updateAuthor: builder.mutation({
      query: ({ authorId, updatedAuthor }) => ({
        url: `/${authorId}/`,
        method: "PUT", // Usa PATCH si la API actualiza parcialmente
        data: updatedAuthor,
      }),
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
  useUpdateAuthorMutation,
} = autorApi;
