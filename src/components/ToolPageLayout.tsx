'use client';

import Navbar from '@/components/Navbar';
import SEOTextBlock from '@/components/SEOTextBlock';

interface ToolPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ToolPageLayout({
  title,
  subtitle,
  children,
}: ToolPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-20 pb-10 font-sans">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-700 mb-8 text-center max-w-md">
            {subtitle}
          </p>
        )}

        {/* TOOL CONTENT */}
        <div className="w-full max-w-md">{children}</div>

        {/* SEO FOOTER */}
        <div className="w-full max-w-prose mt-16">
          <hr className="my-10 border-gray-200" />
          <SEOTextBlock />
        </div>
      </main>
    </>
  );
}
