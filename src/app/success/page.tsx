export default function Success() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 space-y-4 text-center">
      <h1 className="text-3xl font-semibold">Thanks for your order!</h1>
      <p className="text-gray-700">We'll email pickup details shortly.</p>
      <a href="/shop" className="underline">Back to shop</a>
    </main>
  );
}
