'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

function NavbarContent() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const isActive = (href: string) => {
    if (href === '/?mode=time') {
      return pathname === '/' && searchParams.get('mode') === 'time';
    }
    if (href === '/?mode=pace') {
      return pathname === '/' && searchParams.get('mode') !== 'time';
    }
    return pathname === href;
  };

  const navItems = [
    { label: 'Pace Calculator', href: '/?mode=pace'},
    { label: 'Goal Time Calculator', href: '/?mode=time'},
    { label: 'Pace Predictor', href: '/pace-predictor'},
    { label: 'Split Calculator', href: '/split-calculator'},
  ];
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/favicon.ico"
            alt="GoPace logo"
            width={20}
            height={20}
            priority
          />
          <span className="text-xl font-bold text-blue-600">GoPace</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:underline ${
                  isActive(item.href) ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-2xl text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden mt-2 bg-white shadow-md rounded-md py-2 px-4 animate-slide-down">
          <Link
            href="/tools"
            onClick={() => setOpen(false)}
            className={`block py-2 text-sm font-medium uppercase tracking-wide ${
              pathname === '/tools' ? 'text-blue-600 font-semibold' : 'text-gray-500'
            }`}
          >
            All Tools
          </Link>
          <div className="border-t border-gray-200 my-2"></div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-base font-medium ${
                isActive(item.href) ? 'text-blue-600 font-semibold' : 'text-gray-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 py-3 h-16"></div>}>
      <NavbarContent />
    </Suspense>
  );
}
