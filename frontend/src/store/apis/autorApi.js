import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../lib";

export const autorApi = createApi({
  reducerPath: "autorApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `/api`,
  }),
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: () => ({ url: "/authors/", method: "GET" }),
    }),
    createAuthor: builder.mutation({
      query: (newAuthor) => ({
        url: "/authors/",
        method: "POST",
        data: newAuthor,
      }),
    }),
    deleteAuthor: builder.mutation({
      query: (authorId) => ({
        url: `/authors/${authorId}/`,
        method: "DELETE",
      }),
    }),
    updateAuthor: builder.mutation({
      query: ({ authorId, updatedAuthor }) => ({
        url: `/authors/${authorId}/`,
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
