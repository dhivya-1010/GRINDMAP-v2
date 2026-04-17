import React from "react";

function TodayActivity({ github, leetcode, codeforces, onRedirect }) {
  return (
    <div className="today-activity">
      <h2>Today's Activity</h2>

      <p onClick={() => onRedirect("github")} style={{ cursor: "pointer" }}>
        {github > 0 ? "🟢" : "🔴"} GitHub –{" "}
        {github > 0 ? `${github} contributions` : "Not Active"}
      </p>

      <p onClick={() => onRedirect("leetcode")} style={{ cursor: "pointer" }}>
        {leetcode > 0 ? "🟢" : "🔴"} LeetCode –{" "}
        {leetcode > 0 ? `${leetcode} solved` : "Not Active"}
      </p>

      <p onClick={() => onRedirect("codeforces")} style={{ cursor: "pointer" }}>
        {codeforces > 0 ? "🟢" : "🔴"} Codeforces –{" "}
        {codeforces > 0 ? `${codeforces} submissions` : "Not Active"}
      </p>
    </div>
  );
}

export default TodayActivity;
