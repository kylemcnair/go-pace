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
// VDOT calculations based on Jack Daniels' Running Formula

// Calculate VDOT from race performance
export const calculateVDOT = (timeInSeconds: number, distanceKm: number): number => {
  
  // Use reverse lookup from VDOT table to find closest match
  // Convert time to minutes for comparison with table
  const timeInMinutes = timeInSeconds / 60;
  
  let bestVdot = 30;
  let smallestDiff = Infinity;
  
  // Check each VDOT level to find the best match
  VDOT_EQUIVALENTS.forEach(entry => {
    let tableTime;
    
    // Get the equivalent time for this distance from the table
    if (distanceKm === 5) {
      tableTime = entry.fiveK;
    } else if (distanceKm === 10) {
      tableTime = entry.tenK;
    } else if (distanceKm >= 21 && distanceKm <= 21.2) {
      tableTime = entry.half;
    } else if (distanceKm >= 42 && distanceKm <= 42.3) {
      tableTime = entry.marathon;
    } else if (distanceKm === 15) {
      // Interpolate 15K between 10K and half marathon
      tableTime = entry.tenK + 0.68 * (entry.half - entry.tenK);
    } else {
      return; // Skip unsupported distances
    }
    
    const diff = Math.abs(timeInMinutes - tableTime);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      bestVdot = entry.vdot;
    }
  });
  
  // If time is slower than VDOT 30, extrapolate downward
  if (smallestDiff > 5) {
    const vdot30Entry = VDOT_EQUIVALENTS[0];
    let vdot30Time;
    if (distanceKm === 5) vdot30Time = vdot30Entry.fiveK;
    else if (distanceKm === 10) vdot30Time = vdot30Entry.tenK;
    else if (distanceKm >= 21 && distanceKm <= 21.2) vdot30Time = vdot30Entry.half;
    else if (distanceKm >= 42 && distanceKm <= 42.3) vdot30Time = vdot30Entry.marathon;
    else if (distanceKm === 15) vdot30Time = vdot30Entry.tenK + 0.68 * (vdot30Entry.half - vdot30Entry.tenK);
    
    if (vdot30Time && timeInMinutes > vdot30Time) {
      // Extrapolate below VDOT 30
      const extraMinutes = timeInMinutes - vdot30Time;
      bestVdot = Math.max(20, 30 - (extraMinutes / vdot30Time) * 15);
    }
  }
  
  
  return Math.round(bestVdot * 10) / 10;
};

// VDOT equivalent times table (times in minutes)
const VDOT_EQUIVALENTS = [
  { vdot: 30, marathon: 270, half: 125, tenK: 37, fiveK: 17.5 },
  { vdot: 35, marathon: 231, half: 107, tenK: 31.2, fiveK: 14.7 },
  { vdot: 40, marathon: 202, half: 93, tenK: 26.7, fiveK: 12.6 },
  { vdot: 45, marathon: 179, half: 82, tenK: 23.1, fiveK: 10.8 },
  { vdot: 50, marathon: 160, half: 73, tenK: 20.4, fiveK: 9.5 },
  { vdot: 55, marathon: 143, half: 65, tenK: 18.3, fiveK: 8.4 },
  { vdot: 60, marathon: 130, half: 59, tenK: 16.5, fiveK: 7.5 },
  { vdot: 65, marathon: 119, half: 53, tenK: 15.0, fiveK: 6.8 },
  { vdot: 70, marathon: 109, half: 49, tenK: 13.7, fiveK: 6.2 }
];

// Predict race time using VDOT method
export const predictTimeWithVDOT = (vdot: number, targetDistance: string): number => {
  // Handle boundary cases first
  if (vdot <= VDOT_EQUIVALENTS[0].vdot) {
    // Below VDOT 30 - extrapolate slower times
    const lowest = VDOT_EQUIVALENTS[0];
    const vdotDiff = VDOT_EQUIVALENTS[0].vdot - vdot; // How far below VDOT 30
    const slowdownFactor = 1 + (vdotDiff / 30) * 0.5; // Extrapolate slower
    
    let timeMinutes: number;
    switch (targetDistance) {
      case '5K': timeMinutes = lowest.fiveK * slowdownFactor; break;
      case '10K': timeMinutes = lowest.tenK * slowdownFactor; break;
      case 'Half Marathon': timeMinutes = lowest.half * slowdownFactor; break;
      case '15K': timeMinutes = (lowest.tenK + 0.68 * (lowest.half - lowest.tenK)) * slowdownFactor; break;
      case 'Marathon': timeMinutes = lowest.marathon * slowdownFactor; break;
      default: return 0;
    }
    return timeMinutes * 60;
  }
  
  if (vdot >= VDOT_EQUIVALENTS[VDOT_EQUIVALENTS.length - 1].vdot) {
    // Above VDOT 70 - extrapolate faster times
    const highest = VDOT_EQUIVALENTS[VDOT_EQUIVALENTS.length - 1];
    const vdotDiff = vdot - VDOT_EQUIVALENTS[VDOT_EQUIVALENTS.length - 1].vdot;
    const speedupFactor = 1 - (vdotDiff / 70) * 0.3; // Extrapolate faster
    
    let timeMinutes: number;
    switch (targetDistance) {
      case '5K': timeMinutes = highest.fiveK * speedupFactor; break;
      case '10K': timeMinutes = highest.tenK * speedupFactor; break;
      case 'Half Marathon': timeMinutes = highest.half * speedupFactor; break;
      case '15K': timeMinutes = (highest.tenK + 0.68 * (highest.half - highest.tenK)) * speedupFactor; break;
      case 'Marathon': timeMinutes = highest.marathon * speedupFactor; break;
      default: return 0;
    }
    return timeMinutes * 60;
  }
  
  // Find the two closest VDOT values for interpolation
  let lower = VDOT_EQUIVALENTS[0];
  let upper = VDOT_EQUIVALENTS[VDOT_EQUIVALENTS.length - 1];
  
  for (let i = 0; i < VDOT_EQUIVALENTS.length - 1; i++) {
    if (vdot >= VDOT_EQUIVALENTS[i].vdot && vdot <= VDOT_EQUIVALENTS[i + 1].vdot) {
      lower = VDOT_EQUIVALENTS[i];
      upper = VDOT_EQUIVALENTS[i + 1];
      break;
    }
  }
  
  // Linear interpolation between the two values
  const ratio = upper.vdot === lower.vdot ? 0 : (vdot - lower.vdot) / (upper.vdot - lower.vdot);
  
  let timeMinutes: number;
  switch (targetDistance) {
    case '5K':
      timeMinutes = lower.fiveK + ratio * (upper.fiveK - lower.fiveK);
      break;
    case '10K':
      timeMinutes = lower.tenK + ratio * (upper.tenK - lower.tenK);
      break;
    case 'Half Marathon':
      timeMinutes = lower.half + ratio * (upper.half - lower.half);
      break;
    case '15K':
      // Interpolate between 10K and Half Marathon for 15K (15K is ~68% of way from 10K to Half)
      const tenKTime = lower.tenK + ratio * (upper.tenK - lower.tenK);
      const halfTime = lower.half + ratio * (upper.half - lower.half);
      timeMinutes = tenKTime + 0.68 * (halfTime - tenKTime);
      break;
    case 'Marathon':
      timeMinutes = lower.marathon + ratio * (upper.marathon - lower.marathon);
      break;
    default:
      return 0;
  }
  
  return timeMinutes * 60; // Convert to seconds
};
