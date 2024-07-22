import Slider from "@mui/material/Slider";

type CustomSliderType = {
  label: string;
  value: number;
  onChange: (value: React.SetStateAction<number>) => void;
  min: number;
  max: number;
};

export default function CustomSlider({
  label,
  value,
  onChange,
  min,
  max,
}: CustomSliderType) {
  return (
    <div className="flex flex-col my-1 mx-2">
      <span className="capitalize pb-1">{label}</span>
      <div className="flex justify-between">
        <span className="text-xs ">{min}</span>
        <span className="text-xs ">{max}</span>
      </div>
      <div className="mx-1">
        <Slider
          value={value}
          onChange={(_, value) => onChange(Array.isArray(value) ? 8 : value)}
          size="small"
          min={min}
          max={max}
          defaultValue={min}
          aria-label="Small slider for age"
          valueLabelDisplay="auto"
          color="secondary"
        />
      </div>
    </div>
  );
}
