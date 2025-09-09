export default function Book() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">Book Your Farm Stay</h1>
      <p className="text-gray-700">We handle bookings on Airbnb.</p>
      <a
        href="https://airbnb.com/rooms/REPLACE_WITH_LISTING"
        target="_blank"
        className="inline-block px-6 py-3 rounded bg-black text-white"
      >
        Book on Airbnb
      </a>
    </main>
  );
}
