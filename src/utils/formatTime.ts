// src/utils/formatTime.ts
export function formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '--';
  
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
  
    return [h > 0 ? `${h}h` : null, `${m}m`, `${s}s`].filter(Boolean).join(' ');
  }
  