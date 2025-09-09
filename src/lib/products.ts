import { z } from "zod";
import productsData from "@/data/products.json";

const Product = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  currency: z.literal("CAD"),
  price_cents: z.number().int().nonnegative(),
  stripe_price_id: z.string(),
  unit: z.string(),
  in_stock: z.boolean(),
  max_per_order: z.number().int().positive(),
  pickup_only: z.boolean().optional().default(true),
});
export type Product = z.infer<typeof Product>;

const Products = z.array(Product);
const parsed = Products.parse(productsData);

export function allProducts(): Product[] {
  return parsed;
}
export function findBySlug(slug: string): Product | undefined {
  return parsed.find((p) => p.slug === slug);
}
export function assertPurchasable(p: Product, qty: number) {
  if (!p.in_stock) throw new Error("Item out of stock");
  if (qty < 1 || qty > p.max_per_order) throw new Error("Invalid quantity");
}


