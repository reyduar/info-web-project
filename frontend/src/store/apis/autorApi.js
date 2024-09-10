import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../lib";

export const autorApi = createApi({
  reducerPath: "autorApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `/api`,
  }),
  endpoints: (builder) => ({
    getNoticias: builder.query({
      query: () => ({ url: "/auhtors/", method: "GET" }),
    }),
  }),
});

export const { useGetCategoriasQuery } = autorApi;
