interface TimeInputGroupProps {
  hours: string;
  minutes: string;
  seconds: string;
  onHoursChange: (value: string) => void;
  onMinutesChange: (value: string) => void;
  onSecondsChange: (value: string) => void;
  showHours?: boolean;
  idPrefix: string;
  className?: string;
}

export default function TimeInputGroup({
  hours,
  minutes,
  seconds,
  onHoursChange,
  onMinutesChange,
  onSecondsChange,
  showHours = true,
  idPrefix,
  className = ""
}: TimeInputGroupProps) {
  const baseInputClasses = "border border-gray-300 rounded-md p-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";
  
  return (
    <div className={`flex gap-3 ${className}`}>
      {showHours && (
        <input
          id={`${idPrefix}-hours`}
          name={`${idPrefix}-hours`}
          type="number"
          placeholder="Hrs"
          value={hours}
          onChange={e => onHoursChange(e.target.value)}
          className={`${baseInputClasses} w-1/3`}
        />
      )}
      <input
        id={`${idPrefix}-minutes`}
        name={`${idPrefix}-minutes`}
        type="number"
        placeholder="Min"
        value={minutes}
        onChange={e => onMinutesChange(e.target.value)}
        className={`${baseInputClasses} ${showHours ? 'w-1/3' : 'w-1/2'}`}
      />
      <input
        id={`${idPrefix}-seconds`}
        name={`${idPrefix}-seconds`}
        type="number"
        placeholder="Sec"
        value={seconds}
        onChange={e => onSecondsChange(e.target.value)}
        className={`${baseInputClasses} ${showHours ? 'w-1/3' : 'w-1/2'}`}
      />
    </div>
  );
}