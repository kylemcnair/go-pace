// components/Card.tsx
'use client';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-gray-900">
      {children}
    </div>
  );
}
