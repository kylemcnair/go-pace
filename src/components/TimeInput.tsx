"use client";

import { useState } from "react";
import DistanceSelect from "./DistanceSelect";

type TimeInputProps = {
  mode: "pace" | "time";
};

export default function TimeInput({ mode }: TimeInputProps) {
  const [paceUnit, setPaceUnit] = useState<"mile" | "km">("mile");

  return (
    <div className="space-y-4">
      {mode === "pace" ? (
        <>
          <label className="block text-lg font-semibold text-gray-900">
            Enter Your Pace
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Sec"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4 pt-2">
            <label className="flex items-center gap-2 text-gray-800 text-sm">
              <input
                type="radio"
                value="mile"
                checked={paceUnit === "mile"}
                onChange={() => setPaceUnit("mile")}
              />
              min/mile
            </label>
            <label className="flex items-center gap-2 text-gray-800 text-sm">
              <input
                type="radio"
                value="km"
                checked={paceUnit === "km"}
                onChange={() => setPaceUnit("km")}
              />
              min/km
            </label>
          </div>
        </>
      ) : (
        <>
          <label className="block text-lg font-semibold text-gray-900">
            Enter Your Goal Time
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Hrs"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Min"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Sec"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Select Distance:
            </label>
            <DistanceSelect />
          </div>
        </>
      )}
    </div>
  );
}
