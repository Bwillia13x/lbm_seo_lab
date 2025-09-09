import { allProducts } from "@/lib/products";
import Link from "next/link";
import { formatCAD } from "@/lib/currency";

export default function Shop() {
  const items = allProducts();
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Shop</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => (
          <Link key={p.id} href={`/product/${p.slug}`} className="border rounded p-4 hover:shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} className="aspect-square object-cover rounded mb-3" />
            <div className="font-medium">{p.name}</div>
            <div className="text-gray-600">{formatCAD(p.price_cents)}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
