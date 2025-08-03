'use client';

import Link from 'next/link';

export default function ToolsPage() {
  const tools = [
    {
      name: 'Pace → Finish Time Calculator',
      href: '/',
      description: 'Estimate your finish time based on a known running pace.',
    },
    {
      name: 'Pace Predictor',
      href: '/pace-predictor',
      description: 'Predict your race time using a recent effort and distance.',
    },
    {
      name: 'Split Calculator',
      href: '/split-calculator',
      description: 'Plan your race pacing strategy with customizable positive or negative splits.',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center font-sans">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          GoPace Tools
        </h1>

        <ul className="space-y-6">
          {tools.map((tool) => (
            <li key={tool.name}>
              <Link
                href={tool.href}
                className="block p-5 rounded-lg border border-gray-200 shadow-sm hover:bg-blue-50 transition"
              >
                <h2 className="text-xl font-semibold text-blue-600">{tool.name}</h2>
                <p className="text-gray-600 mt-1 text-sm">{tool.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
