import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const appSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({
    // Define the getProducts query
    getProducts: builder.query({
      query: () => "/api/products", // This should match your API endpoint
    }),
  }),
});

// Export the hook for the getProducts query
export const { useGetProductsQuery } = appSlice;
