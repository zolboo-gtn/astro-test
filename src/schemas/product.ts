import { array, number, object, string } from "valibot";
import type { Output } from "valibot";

export const ProductSchema = object({
  id: string(),
  title: string(),
  description: string(),
  price: number(),
  discountPercentage: number(),
  rating: number(),
  stock: number(),
  brand: string(),
  category: string(),
  thumbnail: string(),
  images: array(string()),
});
export type ProductSchema = Output<typeof ProductSchema>;
