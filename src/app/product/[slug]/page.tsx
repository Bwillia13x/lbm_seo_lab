import { findBySlug, assertPurchasable } from "@/lib/products";
import { formatCAD } from "@/lib/currency";

type Props = { params: { slug: string } };

export default function ProductPage({ params }: Props) {
  const p = findBySlug(params.slug);
  if (!p) return <div className="p-6">Not found</div>;

  // Minimal clientless buy: send quantity=1
  const buyHref = `/api/checkout?slug=${encodeURIComponent(p.slug)}&qty=1`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt={p.name} className="w-full rounded" />
      <h1 className="text-3xl font-semibold">{p.name}</h1>
      <div className="text-xl">{formatCAD(p.price_cents)} / {p.unit}</div>
      <p className="text-gray-700">{p.description}</p>
      {!p.in_stock ? (
        <div className="text-red-600">Out of stock</div>
      ) : (
        <a href={buyHref} className="inline-block px-5 py-3 rounded bg-black text-white">
          Buy now — pickup
        </a>
      )}
    </main>
  );
}
