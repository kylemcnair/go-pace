interface UnitSelectorProps {
  unit: 'mile' | 'km';
  onUnitChange: (unit: 'mile' | 'km') => void;
  idPrefix: string;
  className?: string;
  mileLabel?: string;
  kmLabel?: string;
}

export default function UnitSelector({
  unit,
  onUnitChange,
  idPrefix,
  className = "",
  mileLabel = "min/mile",
  kmLabel = "min/km"
}: UnitSelectorProps) {
  return (
    <div className={`flex gap-6 text-lg text-gray-800 font-medium ${className}`}>
      <label className="flex items-center gap-2">
        <input
          id={`${idPrefix}-unit-mile`}
          type="radio"
          name={`${idPrefix}-unit`}
          checked={unit === 'mile'}
          onChange={() => onUnitChange('mile')}
        />
        {mileLabel}
      </label>
      <label className="flex items-center gap-2">
        <input
          id={`${idPrefix}-unit-km`}
          type="radio"
          name={`${idPrefix}-unit`}
          checked={unit === 'km'}
          onChange={() => onUnitChange('km')}
        />
        {kmLabel}
      </label>
    </div>
  );
}