import { RaceDistance } from './distances';

export interface TimeComponents {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface PaceComponents {
  minutes: number;
  seconds: number;
}

// Convert time components to total seconds
export const timeToSeconds = (hours: string | number, minutes: string | number, seconds: string | number): number => {
  const h = typeof hours === 'string' ? parseInt(hours || '0') : hours;
  const m = typeof minutes === 'string' ? parseInt(minutes || '0') : minutes;
  const s = typeof seconds === 'string' ? parseInt(seconds || '0') : seconds;
  return h * 3600 + m * 60 + s;
};

// Convert pace components to total seconds per unit
export const paceToSeconds = (minutes: string | number, seconds: string | number): number => {
  const m = typeof minutes === 'string' ? parseInt(minutes || '0') : minutes;
  const s = typeof seconds === 'string' ? parseInt(seconds || '0') : seconds;
  return m * 60 + s;
};

// Convert seconds back to time components
export const secondsToTime = (totalSeconds: number): TimeComponents => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { hours, minutes, seconds };
};

// Convert seconds back to pace components
export const secondsToPace = (totalSeconds: number): PaceComponents => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { minutes, seconds };
};

// Calculate finish time given pace and distance
export const calculateFinishTime = (
  paceMinutes: string | number,
  paceSeconds: string | number,
  distance: RaceDistance,
  unit: 'mile' | 'km'
): string => {
  const paceInSeconds = paceToSeconds(paceMinutes, paceSeconds);
  if (paceInSeconds === 0) return '--:--:--';
  
  const raceDistance = unit === 'mile' ? distance.miles : distance.km;
  const totalSeconds = Math.round(paceInSeconds * raceDistance);
  const time = secondsToTime(totalSeconds);
  
  return `${time.hours}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
};

// Calculate required pace given goal time and distance
export const calculateRequiredPace = (
  timeHours: string | number,
  timeMinutes: string | number,
  timeSeconds: string | number,
  distance: RaceDistance,
  unit: 'mile' | 'km'
): string => {
  const totalTimeSeconds = timeToSeconds(timeHours, timeMinutes, timeSeconds);
  if (totalTimeSeconds === 0) return '--:--';
  
  const raceDistance = unit === 'mile' ? distance.miles : distance.km;
  const paceInSeconds = totalTimeSeconds / raceDistance;
  const pace = secondsToPace(paceInSeconds);
  
  return `${pace.minutes}:${pace.seconds.toString().padStart(2, '0')}`;
};

// Calculate finish times for all distances (for pace mode display)
export const calculateAllFinishTimes = (
  paceMinutes: string | number,
  paceSeconds: string | number,
  distances: RaceDistance[],
  unit: 'mile' | 'km'
): Array<{ label: string; time: string }> => {
  const paceInSeconds = paceToSeconds(paceMinutes, paceSeconds);
  
  return distances.map(distance => {
    const raceDistance = unit === 'mile' ? distance.miles : distance.km;
    const totalSeconds = paceInSeconds * raceDistance;
    const time = secondsToTime(totalSeconds);
    return {
      label: distance.label,
      time: `${time.hours}h ${time.minutes}m ${time.seconds}s`
    };
  });
};

// Race prediction using Riegel formula: T₁ × (D₂ ÷ D₁)^1.06
export const predictRaceTimes = (
  baseTimeHours: string | number,
  baseTimeMinutes: string | number,
  baseTimeSeconds: string | number,
  baseDistance: RaceDistance,
  targetDistances: RaceDistance[]
): Array<{ label: string; time: string }> => {
  const baseTimeInSeconds = timeToSeconds(baseTimeHours, baseTimeMinutes, baseTimeSeconds);
  if (baseTimeInSeconds === 0) return [];
  
  return targetDistances.map(target => {
    const ratio = target.km / baseDistance.km;
    const predictedSeconds = baseTimeInSeconds * Math.pow(ratio, 1.06);
    const time = secondsToTime(predictedSeconds);
    
    return {
      label: target.label,
      time: `${time.hours}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`
    };
  });
};