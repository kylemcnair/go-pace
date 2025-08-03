'use client';

import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import Card from '@/components/Card';
import RunningFAQ from '@/components/RunningFAQ';
import SEOTextBlock from '@/components/SEOTextBlock';

const raceDistances = [
  { label: '5K', miles: 3.106, km: 5, mileSplits: 3, kmSplits: 5 },
  { label: '10K', miles: 6.213, km: 10, mileSplits: 6, kmSplits: 10 },
  { label: 'Half Marathon', miles: 13.109, km: 21.0975, mileSplits: 13, kmSplits: 21 },
  { label: 'Marathon', miles: 26.219, km: 42.195, mileSplits: 26, kmSplits: 42 },
];

export default function SplitCalculatorPage() {
  const splitCalculatorFAQs = [
    {
      question: "What&apos;s the difference between even and negative splits?",
      answer: "Even splits maintain the same pace throughout the race. Negative splits start slower and gradually increase pace, finishing faster than you started. Negative splits are often recommended for distance races as they help conserve energy early."
    },
    {
      question: "Should I use even or negative split strategy?",
      answer: "For most distance races (10K and longer), negative or even splits are recommended. This prevents early fatigue and allows for a strong finish. Shorter races like 5K can benefit from slightly faster early splits to establish position."
    },
    {
      question: "How much should I negative split?",
      answer: "Start 5-10 seconds per mile/km slower than goal pace for the first third, run goal pace for the middle third, and finish 5-10 seconds faster for the final third. Avoid dramatic pace changes which can be difficult to execute."
    },
    {
      question: "How do I practice race splits in training?",
      answer: "Practice splits during long runs and tempo workouts. Try progression runs where you gradually increase pace every few miles. Race simulation runs at goal pace help you internalize the feel of your target splits."
    },
    {
      question: "What if I fall behind my splits during a race?",
      answer: "Stay calm and adjust gradually. Don&apos;t try to make up large time deficits immediately as this often leads to burnout. Focus on getting back to goal pace over the next 1-2 miles rather than the next quarter-mile."
    }
  ];

  const [selectedDistance, setSelectedDistance] = useState('Marathon');
  const [unit, setUnit] = useState('mile');
  const [goalHours, setGoalHours] = useState('');
  const [goalMinutes, setGoalMinutes] = useState('');
  const [goalSeconds, setGoalSeconds] = useState('');
  const [splitProfile, setSplitProfile] = useState(0);

  const selectedRace = raceDistances.find(d => d.label === selectedDistance);
  const totalGoalSeconds = 
    Number(goalHours || 0) * 3600 + 
    Number(goalMinutes || 0) * 60 + 
    Number(goalSeconds || 0);

  const calculateSplits = () => {
    if (!selectedRace || totalGoalSeconds <= 0) return [];

    const numSplits = unit === "mile" ? selectedRace.mileSplits : selectedRace.kmSplits;
    const totalDistance = unit === "mile" ? selectedRace.miles : selectedRace.km;
    const distancePerSplit = totalDistance / numSplits;
    const averagePaceSeconds = totalGoalSeconds / totalDistance;
    const splits = [];
    
    for (let i = 0; i < numSplits; i++) {
      const progress = i / (numSplits - 1);
      let paceMultiplier = 1;

      if (splitProfile !== 0) {
        // Linear progression from start to finish
        // Negative splits: start slow (high multiplier), finish fast (low multiplier)
        // Positive splits: start fast (low multiplier), finish slow (high multiplier)
        paceMultiplier = 1 + (splitProfile * (0.5 - progress) * 0.4);
      }
      const splitPaceSeconds = averagePaceSeconds * paceMultiplier;
      const splitTimeSeconds = splitPaceSeconds * distancePerSplit;

      const paceMinutes = Math.floor(splitPaceSeconds / 60);
      const paceSecondsRemainder = Math.round(splitPaceSeconds % 60);
      const formattedPace = paceMinutes + ':' + paceSecondsRemainder.toString().padStart(2, '0');

      const splitMinutes = Math.floor(splitTimeSeconds / 60);
      const splitSecondsRemainder = Math.round(splitTimeSeconds % 60);
      const formattedSplitTime = splitMinutes + ':' + splitSecondsRemainder.toString().padStart(2, '0');

      splits.push({
        number: i + 1,
        pace: formattedPace,
        time: formattedSplitTime,
        paceSeconds: splitPaceSeconds,
        relativeWidth: splitPaceSeconds / averagePaceSeconds
      });
    }

    return splits;
  };

  const splits = calculateSplits();

  return (
    <ToolPageLayout
      title="Split Calculator"
      subtitle="Plan your race pacing strategy with customizable positive or negative splits."
    >
      <Card>
        <div className="mb-5">
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

        <div className="flex gap-6 mb-6 text-lg text-gray-800 font-medium">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="unit"
              checked={unit === 'mile'}
              onChange={() => setUnit('mile')}
            />
            Miles
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="unit"
              checked={unit === 'km'}
              onChange={() => setUnit('km')}
            />
            Kilometers
          </label>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-lg text-gray-800">
            Goal Time:
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Hrs"
              value={goalHours}
              onChange={e => setGoalHours(e.target.value)}
              className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Min"
              value={goalMinutes}
              onChange={e => setGoalMinutes(e.target.value)}
              className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Sec"
              value={goalSeconds}
              onChange={e => setGoalSeconds(e.target.value)}
              className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {totalGoalSeconds > 0 && (
          <>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Average Pace Required</div>
                <div className="text-2xl font-bold text-blue-600">
                  {(() => {
                    const totalDistance = unit === 'mile' ? selectedRace?.miles : selectedRace?.km;
                    if (!totalDistance) return '--:--';
                    const averagePaceSeconds = totalGoalSeconds / totalDistance;
                    const paceMinutes = Math.floor(averagePaceSeconds / 60);
                    const paceSeconds = Math.round(averagePaceSeconds % 60);
                    return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
                  })()}
                </div>
                <div className="text-sm text-gray-600">
                  per {unit === 'mile' ? 'mile' : 'kilometer'}
                </div>
              </div>
            </div>
                        <div className="mb-6">
              <label className="block mb-2 font-medium text-lg text-gray-800">
                Split Profile:
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Faster Start</span>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={splitProfile}
                  onChange={e => setSplitProfile(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-600">Faster Finish</span>
              </div>
              <div className="text-center mt-2 text-sm text-gray-500">
                {splitProfile === 0 
                  ? 'Even Splits' 
                  : splitProfile < 0 
                    ? 'Positive Splits (Slow Down)' 
                    : 'Negative Splits (Speed Up)'}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Split Breakdown:
              </h3>
              <div className="flex items-center gap-3 mb-3 text-sm font-medium text-gray-600 border-b border-gray-200 pb-2">
                <div className="w-32 text-center">
                  {unit === 'mile' ? 'Mile #' : 'Kilometer #'}
                </div>
                <div className="flex-1 text-center">
                  Split Time
                </div>
              </div>              <div className="space-y-3">
                {splits.map(split => (
                  <div key={split.number} className="flex items-center gap-3">
                    <div className="w-32 text-center text-sm font-medium text-gray-600">
                      {split.number}
                    </div>
                    <div className="flex-1 ">
                      <div 
                        className="bg-blue-500 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium"
                        style={{ 
                          width: Math.min(100, Math.max(40, split.relativeWidth * 80)) + "%",
                          backgroundColor: (() => {
                            const intensity = Math.min(Math.max(split.relativeWidth, 0.8), 1.2);
                            const opacity = 0.6 + (intensity - 0.8) * 1.0;
                            return `rgba(59, 130, 246, ${Math.max(0.6, Math.min(1.0, opacity))})`;
                          })()
                        }}
                      >
                        {split.time}                      </div>                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                Pace shown as min:sec per {unit} • Split time in each bar
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Educational Content */}
      <div className="mt-8 max-w-prose">
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Race Strategy Tips</h3>
          <p className="text-gray-700 text-sm mb-2">
            Effective split strategy can make the difference between a personal best and a disappointing race. The key is to run conservatively early and save energy for a strong finish.
          </p>
          <p className="text-gray-700 text-sm">
            Remember: it&apos;s easier to speed up than to slow down once you&apos;ve gone out too fast. Practice your goal splits during training runs to develop a feel for your target pace.
          </p>
        </div>
      </div>

      <RunningFAQ faqs={splitCalculatorFAQs} title="Split Strategy FAQ" />
      <SEOTextBlock />
    </ToolPageLayout>
  );
}

