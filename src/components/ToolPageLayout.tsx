'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import SEOTextBlock from '@/components/SEOTextBlock';

interface ToolPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ToolPageLayout({ title, subtitle, children }: ToolPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-20 py-10 font-sans">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">{title}</h1>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-gray-700 mb-8 text-center max-w-md">{subtitle}</p>
        )}

        {/* Page Content */}
        {children}

        {/* Separator */}
        <hr className="w-full max-w-md my-16 border-gray-200" />

        {/* SEO Copy */}
        <SEOTextBlock />
      </main>
    </>
  );
}
