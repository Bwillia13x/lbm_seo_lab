export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 Little Bow Meadows. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="/privacy" className="hover:text-gray-800">Privacy</a>
            <a href="/terms" className="hover:text-gray-800">Terms</a>
            <a href="/refunds" className="hover:text-gray-800">Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
