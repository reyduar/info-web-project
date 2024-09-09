import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCCESS_TOKEN } from "../../constants";
import { API_URL } from "../../config";

export const noticiasApi = createApi({
  reducerPath: "noticiasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/`,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem(ACCCESS_TOKEN)}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNoticias: builder.query({
      query: () => "articles/",
    }),
    getNoticiasByTitle: builder.query({
      query: (title) => `articles/${title}`,
    }),
  }),
});

export const { useGetNoticiasQuery, getNoticiasByTitle } = noticiasApi;
