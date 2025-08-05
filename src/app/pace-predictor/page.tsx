'use client';

import { useState, useMemo } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import Card from '@/components/Card';
import RunningFAQ from '@/components/RunningFAQ';
import { RACE_DISTANCES } from '@/utils/distances';
import { calculateVDOT, predictTimeWithVDOT, secondsToTime } from '@/utils/paceCalculations';
const standardDistances = RACE_DISTANCES;

export default function PacePredictorPage() {
  const pacePredictorFAQs = [
    {
      question: "What's the difference between Riegel and VDOT predictions?",
      answer: "We show two proven methods for comparison. The Riegel Formula uses a simple mathematical relationship between distances. VDOT (Daniels method) uses your aerobic fitness level based on established equivalent performance tables. Riegel tends to be more conservative for longer distances, while VDOT accounts for training adaptations."
    },
    {
      question: "Which prediction method should I trust more?",
      answer: "Both are scientifically validated. If you're well-trained with good endurance base, VDOT predictions may be more accurate. For newer runners or those without specific distance training, Riegel predictions tend to be more realistic. Use both as a range - your actual performance will likely fall between them."
    },
    {
      question: "How accurate are race time predictions?",
      answer: "Race predictions are estimates based on your current performance and established running formulas. Actual results depend on training, race conditions, strategy, and individual physiology. Use predictions as training goals, not guarantees."
    },
    {
      question: "What factors affect race performance beyond fitness?",
      answer: "Weather conditions, course elevation, race strategy, nutrition, hydration, sleep, and mental preparation all significantly impact performance. Hot weather and hills typically slow times, while ideal conditions can help you achieve personal bests."
    },
    {
      question: "Should I train at my predicted race pace?",
      answer: "Not for all runs. Use predicted paces for specific workouts like tempo runs and race-pace intervals. Most training should be at an easy, conversational pace to build aerobic fitness safely."
    },
    {
      question: "Can I use shorter races to predict marathon times?",
      answer: "Yes, but longer predictions become less accurate. A 5K predicts 10K well, but marathon predictions require good endurance base. Marathon performance depends heavily on long run training and fueling strategy."
    }
  ];
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

  const formatTime = (seconds: number): string => {
    const time = secondsToTime(seconds);
    if (time.hours > 0) {
      return `${time.hours}:${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
    } else {
      return `${time.minutes}:${time.seconds.toString().padStart(2, "0")}`;
    }
  };

  const userVDOT = useMemo(() => totalTimeInSeconds > 0 && selectedDistanceKm > 0 
    ? calculateVDOT(totalTimeInSeconds, selectedDistanceKm)
    : null, [totalTimeInSeconds, selectedDistanceKm]);

  const predictions = useMemo(() => {
    if (totalTimeInSeconds <= 0 || selectedDistanceKm <= 0 || !userVDOT) {
      return [];
    }
    return standardDistances
      .filter(d => d.label !== selectedRaceLabel)
      .map(d => {
        // Riegel prediction
        const riegelSeconds = totalTimeInSeconds * Math.pow(d.km / selectedDistanceKm, 1.06);
        
        // VDOT prediction
        const vdotSeconds = predictTimeWithVDOT(userVDOT, d.label);
        
        return { 
          label: d.label, 
          riegel: formatTime(riegelSeconds),
          vdot: formatTime(vdotSeconds)
        };
      });
  }, [totalTimeInSeconds, selectedDistanceKm, userVDOT, selectedRaceLabel]);  return (
    <ToolPageLayout
      title="Pace Predictor"
      subtitle="Enter a recent race result to predict your finish times using multiple proven running formulas."
    >
      {/* Card */}
      <Card>
        {/* Distance selector */}
        <div className="mb-5">
          <label htmlFor="predictor-race-select" className="block mb-2 font-medium text-lg text-gray-800">
            Select Distance:
          </label>
          <select
            id="predictor-race-select"
            name="predictor-race-select"
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

        {/* Time inputs */}
        <div className="flex gap-3 mb-6">
          <input
            id="race-hours"
            name="race-hours"
            type="number"
            placeholder="Hrs"
            value={raceHours}
            onChange={e => setRaceHours(e.target.value)}
            className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            id="race-minutes"
            name="race-minutes"
            type="number"
            placeholder="Min"
            value={raceMinutes}
            onChange={e => setRaceMinutes(e.target.value)}
            className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            id="race-seconds"
            name="race-seconds"
            type="number"
            placeholder="Sec"
            value={raceSeconds}
            onChange={e => setRaceSeconds(e.target.value)}
            className="border border-gray-300 rounded-md p-4 text-lg w-1/3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Predictions list */}
        {predictions.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Predicted Finish Times:
            </h3>
            <div className="space-y-4">
              {predictions.map(p => (
                <div key={p.label} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-gray-800">{p.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-gray-600">Riegel Formula</div>
                      <div className="font-semibold text-blue-600">{p.riegel}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600">Daniels VDOT</div>
                      <div className="font-semibold text-green-600">{p.vdot}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Educational Content */}
      <div className="mt-8 max-w-prose">
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">How Race Prediction Works</h3>
          <p className="text-gray-700 text-sm">
            Our predictions use two proven methods: The Riegel formula (T₁ × (D₂ ÷ D₁)^1.06) accounts for the aerobic and anaerobic demands of different distances. The VDOT method uses Jack Daniels' equivalent performance tables based on your aerobic fitness level. Both assume proper training for the target distance and similar racing conditions.          </p>
        </div>
      </div>

      <RunningFAQ faqs={pacePredictorFAQs} title="Race Prediction FAQ" />
    </ToolPageLayout>
  );
}
