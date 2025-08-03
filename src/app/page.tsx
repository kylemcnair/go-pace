'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ToolPageLayout from '@/components/ToolPageLayout';
import Card from '@/components/Card';

function HomeContent() {
  const [mode, setMode] = useState<'pace' | 'time'>('pace');
  const searchParams = useSearchParams();

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'time') {
      setMode('time');
    } else if (modeParam === 'pace') {
      setMode('pace');
    }
  }, [searchParams]);

  const handleModeChange = (newMode: 'pace' | 'time') => {
    setMode(newMode);
    window.history.pushState({}, '', `/?mode=${newMode}`);
  };

  const [paceMinutes, setPaceMinutes] = useState('');
  const [paceSeconds, setPaceSeconds] = useState('');
  const [timeHours, setTimeHours] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [timeSeconds, setTimeSeconds] = useState('');
  const [unit, setUnit] = useState<'mile' | 'km'>('mile');
  const [selectedDistance, setSelectedDistance] = useState('Marathon');

  const raceDistances = [
    { label: '5K', miles: 3.106 },
    { label: '10K', miles: 6.213 },
    { label: 'Half Marathon', miles: 13.109 },
    { label: 'Marathon', miles: 26.219 },
  ];

  const convertPaceToSeconds = () =>
    parseInt(paceMinutes || '0') * 60 + parseInt(paceSeconds || '0');

  const convertTimeToSeconds = () =>
    parseInt(timeHours || '0') * 3600 +
    parseInt(timeMinutes || '0') * 60 +
    parseInt(timeSeconds || '0');

  const calculateFinishTimes = () => {
    const paceSec = convertPaceToSeconds();
    return raceDistances.map(d => {
      const distance = unit === 'mile' ? d.miles : d.miles * 1.609;
      const totalSec = paceSec * distance;
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = Math.floor(totalSec % 60);
      return { label: d.label, time: `${h}h ${m}m ${s}s` };
    });
  };

  const calculateRequiredPace = () => {
    const timeSec = convertTimeToSeconds();
    const selectedRace = raceDistances.find(d => d.label === selectedDistance);
    if (!selectedRace) return '';
    const distance = unit === 'mile' ? selectedRace.miles : selectedRace.miles * 1.609;
    const paceSec = timeSec / distance;
    const m = Math.floor(paceSec / 60);
    const s = Math.floor(paceSec % 60);
    return `${m}:${s.toString().padStart(2, '0')} per ${unit}`;
  };

  return (
    <ToolPageLayout
      title="GoPace Calculator"
      subtitle="Convert between running pace and finish time—or find the pace to hit your goal."
    >
      {/* Toggle Buttons */}
      <div className="flex flex-col sm:flex-row w-full max-w-md gap-3 mb-8">
        <button
          onClick={() => handleModeChange('pace')}
          className={`w-full py-4 rounded-lg text-lg font-medium transition shadow-sm ${
            mode === 'pace'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Pace → Finish Time
        </button>
        <button
          onClick={() => handleModeChange('time')}
          className={`w-full py-4 rounded-lg text-lg font-medium transition shadow-sm ${
            mode === 'time'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Goal Time → Required Pace
        </button>
      </div>

      {/* Card */}
      <Card>
        {mode === 'pace' && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Enter Your Pace
            </h2>
            <div className="flex gap-3 mb-5">
              <input
                type="number"
                placeholder="Min"
                value={paceMinutes}
                onChange={e => setPaceMinutes(e.target.value)}
                className="border border-gray-300 rounded-md p-4 text-lg w-1/2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Sec"
                value={paceSeconds}
                onChange={e => setPaceSeconds(e.target.value)}
                className="border border-gray-300 rounded-md p-4 text-lg w-1/2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-6 mb-6 text-lg text-gray-800 font-medium">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="unit"
                  checked={unit === 'mile'}
                  onChange={() => setUnit('mile')}
                />
                min/mile
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="unit"
                  checked={unit === 'km'}
                  onChange={() => setUnit('km')}
                />
                min/km
              </label>
            </div>

            {paceMinutes && (
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Your Estimated Finish Times:
                </h3>
                <ul className="space-y-3">
                  {calculateFinishTimes().map(r => (
                    <li
                      key={r.label}
                      className="flex justify-between text-lg border-b pb-2"
                    >
                      <span className="font-medium">{r.label}</span>
                      <span className="font-semibold text-gray-700">
                        {r.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {mode === 'time' && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Enter Your Goal Time
            </h2>
            <div className="flex gap-3 mb-5">
              <input
                type="number"
                placeholder="Hrs"
                value={timeHours}
                onChange={e => setTimeHours(e.target.value)}
                className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Min"
                value={timeMinutes}
                onChange={e => setTimeMinutes(e.target.value)}
                className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Sec"
                value={timeSeconds}
                onChange={e => setTimeSeconds(e.target.value)}
                className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-lg text-gray-800">
                Select Distance:
              </label>
              <select
                value={selectedDistance}
                onChange={e => setSelectedDistance(e.target.value)}
                className="border border-gray-300 rounded-md p-4 text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {raceDistances.map(d => (
                  <option key={d.label} value={d.label}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {(timeHours || timeMinutes) && (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Required Pace:</h3>
                <p className="text-4xl font-bold text-blue-600">
                  {calculateRequiredPace()}
                </p>
              </div>
            )}
          </>
        )}
      </Card>
    </ToolPageLayout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
