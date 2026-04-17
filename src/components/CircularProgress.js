import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({
  percentage,
  solved,
  goal,
  color = "#00f5a0",
  size = "medium",
}) => {
  const sizes = {
    small: 100,
    medium: 150,
    large: 240,
  };

  const width = sizes[size] || sizes.medium;

  let finalPercentage = 0;

  if (
    typeof solved === "number" &&
    typeof goal === "number" &&
    goal > 0
  ) {
    finalPercentage = Math.round((solved / goal) * 100);
  } else if (typeof percentage === "number") {
    finalPercentage = percentage;
  }

  finalPercentage = Math.max(0, Math.min(100, finalPercentage));

  const displayText =
    typeof solved === "number" && typeof goal === "number"
      ? `${finalPercentage}%`
      : `${finalPercentage}%`;

  return (
    <div
      className="circular-progress-container"
      style={{
        width: `${width}px`,
        height: `${width}px`,
        margin: "20px auto",
        filter: "drop-shadow(0 0 12px rgba(0,255,170,0.6))",
        animation: "popIn 0.6s ease",
      }}
    >
      <CircularProgressbar
        value={finalPercentage}
        text={displayText}
        styles={buildStyles({
          textSize: "18px",
          pathColor: color,
          textColor: "#ffffff",
          trailColor: "rgba(255,255,255,0.15)",
          pathTransitionDuration: 0.8,
        })}
      />
    </div>
  );
};

export default CircularProgress;
