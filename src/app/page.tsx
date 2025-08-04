'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ToolPageLayout from '@/components/ToolPageLayout';
import Card from '@/components/Card';
import PaceGuide from '@/components/PaceGuide';
import RaceTimeGuide from '@/components/RaceTimeGuide';
import RunningFAQ from '@/components/RunningFAQ';
import TimeInputGroup from '@/components/shared/TimeInputGroup';
import UnitSelector from '@/components/shared/UnitSelector';
import DistanceSelect from '@/components/DistanceSelect';
import { RACE_DISTANCES, getDistanceByLabel } from '@/utils/distances';
import { calculateAllFinishTimes, calculateRequiredPace } from '@/utils/paceCalculations';

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

  const paceCalculatorFAQs = [
    {
      question: "Will I actually run this pace in a race?",
      answer: "These calculations show your mathematical pace, but real race performance varies due to terrain, weather, fitness level, and race strategy. Use these as guidelines for training and goal setting rather than exact predictions."
    },
    {
      question: "What's the difference between mile pace and kilometer pace?",
      answer: "Mile pace is time per mile (used commonly in the US), while kilometer pace is time per kilometer (used internationally). A 7:00 mile pace equals approximately 4:21 per kilometer."
    },
    {
      question: "Should I use my race pace for training runs?",
      answer: "No, most training should be done at an easier pace. Race pace is typically used for specific workouts like tempo runs or race simulation. Easy runs should be 1-2 minutes per mile slower than race pace."
    },
    {
      question: "How do I improve my running pace?",
      answer: "Consistent training with a mix of easy runs, tempo runs, intervals, and long runs will improve your pace over time. Gradually increase weekly mileage and include one speed workout per week."
    }
  ];

  const raceDistances = RACE_DISTANCES;

  const getFinishTimes = () => {
    return calculateAllFinishTimes(paceMinutes, paceSeconds, raceDistances, unit);
  };

  const getRequiredPace = () => {
    const selectedRace = getDistanceByLabel(selectedDistance);
    if (!selectedRace) return '';
    
    const pace = calculateRequiredPace(timeHours, timeMinutes, timeSeconds, selectedRace, unit);
    return `${pace} per ${unit}`;
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
            <div className="mb-5">
              <TimeInputGroup
                hours=""
                minutes={paceMinutes}
                seconds={paceSeconds}
                onHoursChange={() => {}} // Not used for pace
                onMinutesChange={setPaceMinutes}
                onSecondsChange={setPaceSeconds}
                showHours={false}
                idPrefix="pace"
              />
            </div>
            <UnitSelector
              unit={unit}
              onUnitChange={setUnit}
              idPrefix="pace"
              className="mb-6"
            />

            {paceMinutes && (
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Your Estimated Finish Times:
                </h3>
                <ul className="space-y-3">
                  {getFinishTimes().map(r => (
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
            <div className="mb-5">
              <TimeInputGroup
                hours={timeHours}
                minutes={timeMinutes}
                seconds={timeSeconds}
                onHoursChange={setTimeHours}
                onMinutesChange={setTimeMinutes}
                onSecondsChange={setTimeSeconds}
                showHours={true}
                idPrefix="time"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="distance-select" className="block mb-2 font-medium text-lg text-gray-800">
                Select Distance:
              </label>
              <DistanceSelect
                id="distance-select"
                value={selectedDistance}
                onChange={setSelectedDistance}
                className="border border-gray-300 rounded-md p-4 text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {(timeHours || timeMinutes) && (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Required Pace:</h3>
                <p className="text-4xl font-bold text-blue-600">
                  {getRequiredPace()}
                </p>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Educational Content */}
      {mode === 'pace' && paceMinutes && (
        <PaceGuide 
          paceMinutes={paceMinutes} 
          paceSeconds={paceSeconds} 
          unit={unit} 
        />
      )}
      
      {mode === 'time' && timeHours && (
        <RaceTimeGuide 
          timeHours={timeHours}
          timeMinutes={timeMinutes}
          timeSeconds={timeSeconds}
          distance={selectedDistance}
        />
      )}

      <RunningFAQ faqs={paceCalculatorFAQs} />
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
