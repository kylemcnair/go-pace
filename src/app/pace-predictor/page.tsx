'use client';

import { useState } from 'react';
import ToolPageLayout from '@/components/ToolPageLayout';
import Card from '@/components/Card';
import RunningFAQ from '@/components/RunningFAQ';
import { RACE_DISTANCES } from '@/utils/distances';

const standardDistances = RACE_DISTANCES;

export default function PacePredictorPage() {
  const pacePredictorFAQs = [
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
      question: "How often should I update my race predictions?",
      answer: "Update predictions after completing a race or time trial, or every 4-6 weeks during consistent training. Significant improvements typically take 6-12 weeks of consistent training to appear."
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
      {/* Card */}
      <Card>
        {/* Distance selector */}
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
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Predicted Finish Times:
            </h3>
            <ul className="space-y-3">
              {predictions.map(p => (
                <li
                  key={p.label}
                  className="flex justify-between text-lg border-b pb-2"
                >
                  <span className="font-medium text-gray-700">{p.label}</span>
                  <span className="font-semibold text-gray-800">{p.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Educational Content */}
      <div className="mt-8 max-w-prose">
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">How Race Prediction Works</h3>
          <p className="text-gray-700 text-sm">
            Our predictions use the Riegel formula: T₁ × (D₂ ÷ D₁)^1.06, which accounts for the aerobic and anaerobic demands of different distances. 
            The formula assumes proper training for the target distance and similar racing conditions.
          </p>
        </div>
      </div>

      <RunningFAQ faqs={pacePredictorFAQs} title="Race Prediction FAQ" />
    </ToolPageLayout>
  );
}
