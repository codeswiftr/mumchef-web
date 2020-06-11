import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const defaultMarks = [
  {
    value: 10,
    label: "10m",
  },
  {
    value: 30,
    label: "30m",
  },
  {
    value: 60,
    label: "1h",
  },
  {
    value: 120,
    label: "2h",
  },
];

export default function TimeSlider({ label, marks, unit = "m" }) {
  const classes = useStyles();
  marks = marks || defaultMarks;
  function valuetext(value, x, unit = "") {
    return `${value} ${unit}`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  return (
    <div className={classes.root}>
      <Typography id='discrete-slider-restrict' gutterBottom>
        Restricted values
      </Typography>
      <Slider
        defaultValue={20}
        valueLabelFormat={valuetext}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider-restrict'
        step={null}
        valueLabelDisplay='on'
        marks={marks}
      />
    </div>
  );
}
