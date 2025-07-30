'use client';

import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';

const standardDistances = [
  { label: '5K', km: 5 },
  { label: '10K', km: 10 },
  { label: 'Half Marathon', km: 21.0975 },
  { label: 'Marathon', km: 42.195 },
];

export default function PacePredictorPage() {
  const [raceHours, setRaceHours] = useState('');
  const [raceMinutes, setRaceMinutes] = useState('');
  const [raceSeconds, setRaceSeconds] = useState('');
  const [selectedRaceLabel, setSelectedRaceLabel] = useState('10K');

  const totalTimeInSeconds =
    Number(raceHours || 0) * 3600 +
    Number(raceMinutes || 0) * 60 +
    Number(raceSeconds || 0);

  const selectedRace = standardDistances.find(d => d.label === selectedRaceLabel);
  const selectedDistanceKm = selectedRace?.km || 0;

  const predictions =
    totalTimeInSeconds > 0 && selectedDistanceKm > 0
      ? standardDistances
          .filter(d => d.label !== selectedRaceLabel)
          .map(d => {
            const predictedSeconds =
              totalTimeInSeconds * Math.pow(d.km / selectedDistanceKm, 1.06);
            const h = Math.floor(predictedSeconds / 3600);
            const m = Math.floor((predictedSeconds % 3600) / 60);
            const s = Math.round(predictedSeconds % 60);
            return { label: d.label, time: `${h}h ${m}m ${s}s` };
          })
      : [];

  return (
    <ToolPageLayout
      title="Pace Predictor"
      subtitle="Enter a recent race result to predict your finish times for other distances using the Riegel formula."
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <div className="mb-5">
          <label className="block mb-2 font-medium text-lg text-gray-800">
            Select Distance:
          </label>
          <select
            value={selectedRaceLabel}
            onChange={e => setSelectedRaceLabel(e.target.value)}
            className="border border-gray-300 rounded-md p-4 text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {standardDistances.map(d => (
              <option key={d.label} value={d.label}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="number"
            placeholder="Hrs"
            value={raceHours}
            onChange={e => setRaceHours(e.target.value)}
            className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Min"
            value={raceMinutes}
            onChange={e => setRaceMinutes(e.target.value)}
            className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Sec"
            value={raceSeconds}
            onChange={e => setRaceSeconds(e.target.value)}
            className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {predictions.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Predicted Finish Times:
            </h3>
            <ul className="space-y-3">
              {predictions.map(p => (
                <li
                  key={p.label}
                  className="flex justify-between text-lg border-b pb-2"
                >
                  <span className="font-medium">{p.label}</span>
                  <span className="font-semibold text-gray-700">{p.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Predictions use the Riegel formula: T₂ = T₁ × (D₂ ÷ D₁)^1.06
      </p>
    </ToolPageLayout>
  );
}
