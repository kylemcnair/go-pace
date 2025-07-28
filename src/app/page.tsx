"use client";

import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [mode, setMode] = useState<"pace" | "time">("pace");
  const [paceMinutes, setPaceMinutes] = useState("");
  const [paceSeconds, setPaceSeconds] = useState("");
  const [timeHours, setTimeHours] = useState("");
  const [timeMinutes, setTimeMinutes] = useState("");
  const [timeSeconds, setTimeSeconds] = useState("");
  const [unit, setUnit] = useState<"mile" | "km">("mile");
  const [selectedDistance, setSelectedDistance] = useState("Marathon");

  const raceDistances = [
    { label: "5K", miles: 3.106 },
    { label: "10K", miles: 6.213 },
    { label: "Half Marathon", miles: 13.109 },
    { label: "Marathon", miles: 26.219 },
  ];

  const convertPaceToSeconds = () =>
    parseInt(paceMinutes || "0") * 60 + parseInt(paceSeconds || "0");

  const convertTimeToSeconds = () =>
    parseInt(timeHours || "0") * 3600 +
    parseInt(timeMinutes || "0") * 60 +
    parseInt(timeSeconds || "0");

  const calculateFinishTimes = () => {
    const paceSec = convertPaceToSeconds();
    return raceDistances.map((d) => {
      const distance =
        unit === "mile" ? d.miles : d.miles * 1.609; // convert to km if needed
      const totalSec = paceSec * distance;
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = Math.floor(totalSec % 60);
      return { label: d.label, time: `${h}h ${m}m ${s}s` };
    });
  };

  const calculateRequiredPace = () => {
    const timeSec = convertTimeToSeconds();
    const selectedRace = raceDistances.find(
      (d) => d.label === selectedDistance
    );
    if (!selectedRace) return "";
    const distance = unit === "mile" ? selectedRace.miles : selectedRace.miles * 1.609;
    const paceSec = timeSec / distance;
    const m = Math.floor(paceSec / 60);
    const s = Math.floor(paceSec % 60);
    return `${m}:${s.toString().padStart(2, "0")} per ${unit}`;
  };

  return (
    <>
      <Head>
        <title>GoPace – Free Running Pace Calculator</title>
        <meta
          name="description"
          content="Free running pace calculator for 5K, 10K, half marathon, and marathon. Calculate finish times or find your required pace for race goals."
        />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">GoPace Calculator</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("pace")}
            className={`px-4 py-2 rounded ${
              mode === "pace" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Pace → Finish Time
          </button>
          <button
            onClick={() => setMode("time")}
            className={`px-4 py-2 rounded ${
              mode === "time" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Goal Time → Required Pace
          </button>
        </div>

        {mode === "pace" && (
          <div className="w-full max-w-md bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Enter Your Pace</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Min"
                value={paceMinutes}
                onChange={(e) => setPaceMinutes(e.target.value)}
                className="border rounded p-2 w-1/2"
              />
              <input
                type="number"
                placeholder="Sec"
                value={paceSeconds}
                onChange={(e) => setPaceSeconds(e.target.value)}
                className="border rounded p-2 w-1/2"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <label>
                <input
                  type="radio"
                  name="unit"
                  checked={unit === "mile"}
                  onChange={() => setUnit("mile")}
                />
                <span className="ml-1">min/mile</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="unit"
                  checked={unit === "km"}
                  onChange={() => setUnit("km")}
                />
                <span className="ml-1">min/km</span>
              </label>
            </div>

            {paceMinutes && (
              <div>
                <h3 className="text-lg font-medium mb-2">Finish Times:</h3>
                <ul className="space-y-2">
                  {calculateFinishTimes().map((r) => (
                    <li key={r.label} className="flex justify-between">
                      <span>{r.label}</span>
                      <span>{r.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {mode === "time" && (
          <div className="w-full max-w-md bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Enter Your Goal Time</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Hrs"
                value={timeHours}
                onChange={(e) => setTimeHours(e.target.value)}
                className="border rounded p-2 w-1/3"
              />
              <input
                type="number"
                placeholder="Min"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)}
                className="border rounded p-2 w-1/3"
              />
              <input
                type="number"
                placeholder="Sec"
                value={timeSeconds}
                onChange={(e) => setTimeSeconds(e.target.value)}
                className="border rounded p-2 w-1/3"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Select Distance:</label>
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="border rounded p-2 w-full"
              >
                {raceDistances.map((d) => (
                  <option key={d.label} value={d.label}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {timeHours || timeMinutes ? (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Required Pace:</h3>
                <p className="text-xl font-bold">{calculateRequiredPace()}</p>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </>
  );
}
