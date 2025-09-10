"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/book", label: "Book Stay" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Little Bow Meadows home" className="text-xl font-semibold belmont-accent-text">
            Little Bow Meadows
          </Link>
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    "hover:text-gray-700 focus-ring rounded-md px-1 " +
                    (isActive ? "text-gray-900 font-medium" : "text-gray-600")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
