"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-primary text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/resumes" className={linkClass("/resumes")}>
              Resumes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
