import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";

import FieldHeader from "./FieldHeader";

const CustomStyledSlider = styled(Slider)(() => ({
  "& .MuiSlider-valueLabel": {
    top: 60,
    backgroundColor: "#fff",
    borderRadius: "0.25rem",
    border: "1px solid #CBB6E5",
    color: "#761BE4",
    fontWeight: 500,
    padding: ".25rem .75rem",
    zIndex: "40",

    "&::before": {
      bottom: "unset",
      top: "-.5rem",
      borderTop: "1px solid #CBB6E5",
      borderLeft: "1px solid #CBB6E5",
      zIndex: "2",
    },
  },
  "& .MuiSlider-thumbSizeMedium": {
    width: "16px",
    height: "16px",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#761BE4",
  },
  "& .MuiSlider-track": {
    backgroundColor: "#761BE4",
  },
  "& .MuiSlider-thumb": {
    backgroundColor: "#761BE4",
  },
}));

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
    <div className="flex flex-col my-1">
      <FieldHeader label={label} />
      <div className="flex justify-between mx-1 text-xs">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <div className="mx-2">
        <CustomStyledSlider
          value={value}
          onChange={(_, value) => onChange(Array.isArray(value) ? 8 : value)}
          size="medium"
          min={min}
          max={max}
          defaultValue={min}
          aria-label="Slider for age"
          valueLabelDisplay="auto"
          color="secondary"
        />
      </div>
    </div>
  );
}
