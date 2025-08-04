"use client";

import { getDistanceOptions } from '@/utils/distances';

interface DistanceSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
}

export default function DistanceSelect({
  value,
  onChange,
  id = "distance-selector",
  name,
  className = "w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
}: DistanceSelectProps) {
  const distanceOptions = getDistanceOptions();
  
  return (
    <select
      id={id}
      name={name || id}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className={className}
    >
      {distanceOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
