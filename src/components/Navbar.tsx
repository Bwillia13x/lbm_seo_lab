export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-xl font-semibold">Little Bow Meadows</a>
          <div className="space-x-6">
            <a href="/" className="hover:text-gray-600">Home</a>
            <a href="/shop" className="hover:text-gray-600">Shop</a>
            <a href="/book" className="hover:text-gray-600">Book Stay</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
