import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../lib";

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
      query: (title) => ({ url: `/articles/${title}/`, method: "GET" }),
    }),
  }),
});

export const { useGetNoticiasQuery, getNoticiasByTitle } = noticiasApi;
