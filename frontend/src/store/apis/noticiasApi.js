import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../infrastructure";

export const noticiasApi = createApi({
  reducerPath: "noticiasApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `/api`,
  }),
  endpoints: (builder) => ({
    getNoticias: builder.query({
      query: () => ({ url: "/articles/", method: "GET" }),
    }),
    getNoticiasByTitle: builder.query({
      query: (title) => ({
        url: `/articles/${title ? title : "all"}/`,
        method: "GET",
      }),
    }),
    createArticle: builder.mutation({
      query: (newArticles) => ({
        url: "/articles/",
        method: "POST",
        data: newArticles,
      }),
    }),
    deleteArticle: builder.mutation({
      query: (articleId) => ({
        url: `/articles/delete/${parseInt(articleId)}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetNoticiasQuery,
  useGetNoticiasByTitleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
} = noticiasApi;
