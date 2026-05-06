import React from "react";
import CircularProgress from "./CircularProgress";

function ProblemStats({ solved, total }) {

  const percentage = Math.round(
    (solved / total) * 100
  );

  return (
    <div className="platform-card">

      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Total Problems Solved
      </h2>

      <CircularProgress
        percentage={percentage}
        size="large"
      />

      <h3
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#00f5a0",
          fontSize: "28px",
        }}
      >
        {solved} / {total}
      </h3>

      <p
        style={{
          textAlign: "center",
          opacity: 0.7,
          marginTop: "10px",
        }}
      >
        Problems solved across platforms
      </p>

    </div>
  );
}

export default ProblemStats;