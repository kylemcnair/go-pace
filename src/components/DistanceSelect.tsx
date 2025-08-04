"use client";

import { getDistanceOptions } from '@/utils/distances';

export default function DistanceSelect() {
  const distanceOptions = getDistanceOptions();
  
  return (
    <select
      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {distanceOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
