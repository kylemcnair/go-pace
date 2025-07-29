"use client";

export default function DistanceSelect() {
  return (
    <select
      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="5">5K</option>
      <option value="10">10K</option>
      <option value="21.097">Half Marathon</option>
      <option value="42.195">Marathon</option>
    </select>
  );
}
