// Time formatting utilities for the running pace calculator

// Original formatTime function (kept for compatibility)
export function formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '--';
  
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
  
    return [h > 0 ? `${h}h` : null, `${m}m`, `${s}s`].filter(Boolean).join(' ');
}

// Format seconds to pace format (M:SS)
export function formatPace(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '--:--';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Format seconds to race time format (H:MM:SS or M:SS)
export function formatRaceTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '--:--:--';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// Parse time string (H:MM:SS or M:SS) to seconds
export function parseTimeToSeconds(timeString: string): number {
  const parts = timeString.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}
  