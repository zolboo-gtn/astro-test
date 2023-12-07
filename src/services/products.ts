import type { ProductSchema } from "@/schemas/product";

type GetProductsResponse = {
  products: ProductSchema[];
  total: number;
  skip: number;
  limit: number;
};
export const getProducts = async ({
  limit,
  skip,
}: Partial<Pick<GetProductsResponse, "limit" | "skip">> = {}) => {
  const url = new URL("https://dummyjson.com");
  url.pathname = "/products";
  if (limit) {
    url.searchParams.set("limit", limit.toString());
  }
  if (skip) {
    url.searchParams.set("skip", skip.toString());
  }

  const response = await fetch(url);
  const data: GetProductsResponse = await response.json();

  return data;
};
export const getProduct = async (id: string) => {
  const url = new URL("https://dummyjson.com");
  url.pathname = `/products/${id}`;

  const response = await fetch(url);
  const data: ProductSchema = await response.json();

  return data;
};
