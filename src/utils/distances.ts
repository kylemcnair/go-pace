export interface RaceDistance {
  label: string;
  km: number;
  miles: number;
  // For split calculator - how many mile/km splits to show
  mileSplits: number;
  kmSplits: number;
  // Common abbreviation for dropdowns
  shortLabel?: string;
}

export const RACE_DISTANCES: RaceDistance[] = [
  {
    label: '5K',
    shortLabel: '5K',
    km: 5,
    miles: 3.106,
    mileSplits: 3,
    kmSplits: 5
  },
  {
    label: '10K', 
    shortLabel: '10K',
    km: 10,
    miles: 6.213,
    mileSplits: 6,
    kmSplits: 10
  },
  {
    label: '15K',
    shortLabel: '15K',
    km: 15,
    miles: 9.32,
    mileSplits: 9,
    kmSplits: 15
  },
  {
    label: 'Half Marathon',
    shortLabel: 'Half',
    km: 21.0975,
    miles: 13.109,
    mileSplits: 13,
    kmSplits: 21
  },
  {
    label: 'Marathon',
    shortLabel: 'Marathon',
    km: 42.195,
    miles: 26.219,
    mileSplits: 26,
    kmSplits: 42
  }
];

// Helper functions
export const getDistanceByLabel = (label: string): RaceDistance | undefined => {
  return RACE_DISTANCES.find(d => d.label === label);
};

export const getDistanceLabels = (): string[] => {
  return RACE_DISTANCES.map(d => d.label);
};

// For components that need just km values (like DistanceSelect)
export const getDistanceOptions = () => {
  return RACE_DISTANCES.map(d => ({
    value: d.km.toString(),
    label: d.label
  }));
};