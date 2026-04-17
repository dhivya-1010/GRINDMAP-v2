import React, { useState, useEffect } from "react";
import CircularProgress from "../components/CircularProgress";
import ActivityHeatmap from "../components/ActivityHeatmap";
import "./ProgressPage.css";

function ProgressPage() {
  const [platformData, setPlatformData] = useState({});

  useEffect(() => {
    // Load platform data from localStorage
    const savedPlatformData = localStorage.getItem("platformData");
    if (savedPlatformData) {
      setPlatformData(JSON.parse(savedPlatformData));
    }
  }, []);

  const totalSolved =
    (platformData.leetcode?.totalSolved || 0) +
    (platformData.codeforces?.solved || 0);

  const totalProblems = 4000;

  return (
    <div className="progress-page">
      <h1>Overall Progress</h1>
      <p className="progress-subtitle">
        Visualize your coding journey and achievements
      </p>

      {/* OVERALL PROGRESS */}
      <div className="overall-progress-section">
        <h2>Total Problems Solved</h2>
        <CircularProgress
          solved={totalSolved}
          goal={totalProblems}
          color="#00f5a0"
          size="large"
        />
      </div>

      {/* GITHUB HEATMAP */}
      {platformData.heatmap && platformData.heatmap.length > 0 ? (
        <div className="heatmap-section">
          <h2>GitHub Activity Heatmap</h2>
          <ActivityHeatmap data={platformData.heatmap} />
        </div>
      ) : (
        <div className="no-data">
          <p>No GitHub activity data available</p>
          <p className="hint">
            Go to Dashboard and fetch your GitHub data to see your activity
            heatmap
          </p>
        </div>
      )}
    </div>
  );
}

export default ProgressPage;

