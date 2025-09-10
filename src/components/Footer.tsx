export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 border-t" role="contentinfo">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center text-gray-600">
          <p>&copy; {year} Little Bow Meadows. All rights reserved.</p>
          <nav className="mt-4 space-x-4" aria-label="Legal">
            <a href="/privacy" className="hover:text-gray-800 focus-ring rounded-sm">Privacy</a>
            <a href="/terms" className="hover:text-gray-800 focus-ring rounded-sm">Terms</a>
            <a href="/refunds" className="hover:text-gray-800 focus-ring rounded-sm">Refunds</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
