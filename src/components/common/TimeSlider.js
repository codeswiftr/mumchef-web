import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const defaultMarks = [
  {
    value: 5,
    label: "5m",
  },
  {
    value: 10,
    // label: "10m",
  },
  {
    value: 15,
    label: "15m",
  },
  {
    value: 20,
    // label: "20m",
  },
  {
    value: 30,
    label: "30m",
  },
  {
    value: 45,
    label: "40m",
  },
  {
    value: 60,
    label: "1h",
  },
  {
    value: 90,
    label: "1.5h",
  },
  {
    value: 120,
    label: "2h",
  },
];

export default function TimeSlider({
  label,
  marks,
  unit = "m",
  value,
  setValue,
}) {
  marks = marks || defaultMarks;
  function valuetext(value, x, unit = "") {
    return `${value} ${unit}`;
  }

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Typography id='discrete-slider-restrict' gutterBottom>
        {label}
      </Typography>
      <Slider
        value={value}
        valueLabelFormat={valuetext}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider-restrict'
        max={120}
        step={null}
        valueLabelDisplay='on'
        marks={marks}
        onChange={handleSliderChange}
      />
    </div>
  );
}
