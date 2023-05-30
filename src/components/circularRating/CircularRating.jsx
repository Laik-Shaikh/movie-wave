import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import './ratings.scss';

const CircularRating = ({ ratings }) => {

  return (
    <div className="circular-rating">
      <CircularProgressbar
        value={ratings}
        maxValue={10}
        text={ratings}
        styles={buildStyles({
          pathColor:
              ratings < 5 ? "red" : ratings < 7 ? "orange" : "green",
      })}
      />
    </div>
  );
}

export default CircularRating;