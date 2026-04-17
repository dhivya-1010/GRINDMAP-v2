import React from "react";
import CircularProgress from "./CircularProgress";

function PlatformCard({ name, platformKey, data, onClick }) {
  let percentage = 0;
  let solved = 0;
  let goal = 100;

  // Only calculate if data exists
  if (data) {
    /* ---------- GITHUB ---------- */
    if (platformKey === "github") {
      const score = (data.publicRepos || 0) * 5 + (data.followers || 0) * 3;

      solved = score;
      goal = 300; // arbitrary goal
      percentage = Math.round((score / goal) * 100);
    }

    /* ---------- LEETCODE ---------- */
    if (platformKey === "leetcode") {
      solved = data.totalSolved || 0;
      goal = 3000; // total LeetCode problems
      percentage = Math.round((solved / goal) * 100);
    }

    /* ---------- CODEFORCES ---------- */
    if (platformKey === "codeforces") {
      solved = data.rating || 0;
      goal = 3500; // max rating scale
      percentage = Math.round((solved / goal) * 100);
    }

    percentage = Math.max(0, Math.min(100, percentage));
  }

  // Special case for streak (no data object needed)
  if (platformKey === "streak") {
    // data will be the streak count passed directly
    const streakCount = data || 0;
    solved = streakCount;
    goal = 30; // 30 day goal
    percentage = Math.round((streakCount / goal) * 100);
    percentage = Math.max(0, Math.min(100, percentage));
  }

  return (
    <div
      className="platform-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <h3>{name}</h3>

      <CircularProgress percentage={percentage} size="small" />

      {platformKey === "github" && (
        <>
          <p>Repos: {data?.publicRepos || 0}</p>
          <p>Followers: {data?.followers || 0}</p>
        </>
      )}

      {platformKey === "leetcode" && (
        <>
          <p>Total Solved: {data?.totalSolved || 0}</p>
          <p>Easy: {data?.easySolved || 0}</p>
          <p>Medium: {data?.mediumSolved || 0}</p>
          <p>Hard: {data?.hardSolved || 0}</p>
        </>
      )}

      {platformKey === "codeforces" && (
        <>
          <p>Solved: {data?.solved || 0}</p>
          <p>Rating: {data?.rating || 0}</p>
        </>
      )}

      {platformKey === "streak" && (
        <>
          <p>Current Streak: {data || 0} days 🔥</p>
          <p style={{ fontSize: "0.9em", opacity: 0.8 }}>
            Keep coding daily to maintain your streak!
          </p>
        </>
      )}

      {!data && platformKey !== "streak" && (
        <p style={{ opacity: 0.5, fontStyle: "italic" }}>No data loaded yet</p>
      )}
    </div>
  );
}

export default PlatformCard;
