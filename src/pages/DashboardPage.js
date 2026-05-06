import React,
{
  useState,
  useEffect,
} from "react";

import CircularProgress
from "../components/CircularProgress";

import ActivityHeatmap
from "../components/ActivityHeatmap";

import "./ProgressPage.css";

function ProgressPage() {

  const [platformData,
    setPlatformData] =
    useState({});

  useEffect(() => {

    const savedPlatformData =
      localStorage.getItem(
        "platformData"
      );

    if (
      savedPlatformData
    ) {

      setPlatformData(
        JSON.parse(
          savedPlatformData
        )
      );
    }

  }, []);

  // ================= TOTAL =================

  const totalSolved =

    (platformData.leetcode
      ?.totalSolved || 0) +

    (platformData.codeforces
      ?.solved || 0);

  const totalProblems =
    4000;

  return (

    <div className="progress-page">

      <h1>
        Overall Progress
      </h1>

      <p className="progress-subtitle">

        Visualize your coding
        journey and achievements

      </p>

      {/* ================= PROBLEM STATS ================= */}

      <div
        className="overall-progress-section"
      >

        <h2>
          Total Problems Solved
        </h2>

        <CircularProgress

          solved={
            totalSolved
          }

          goal={
            totalProblems
          }

          color="#00f5a0"

          size="large"
        />

        <h3
          style={{

            textAlign:
              "center",

            marginTop:
              "20px",

            color:
              "#00f5a0",

            fontSize:
              "28px",
          }}
        >

          {totalSolved}
          {" / "}
          {totalProblems}

        </h3>

        <p
          style={{

            textAlign:
              "center",

            marginTop:
              "10px",

            opacity: 0.7,
          }}
        >

          Problems solved
          across platforms

        </p>

      </div>

      {/* ================= HEATMAP ================= */}

      {platformData.github
        ?.heatmap &&
      platformData.github
        .heatmap.length > 0 ? (

        <div
          className="heatmap-section"
        >

          <h2>
            GitHub Activity
            Heatmap
          </h2>

          <ActivityHeatmap
            data={
              platformData.github
                .heatmap
            }
          />

        </div>

      ) : (

        <div
          className="no-data"
        >

          <p>
            No GitHub activity
            data available
          </p>

        </div>

      )}

    </div>
  );
}

export default ProgressPage;