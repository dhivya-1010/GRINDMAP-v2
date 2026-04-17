import React, { useState, useEffect } from "react";
import PlatformCard from "../components/PlatformCard";
import "./PlatformsPage.css";

function PlatformsPage() {
  const [usernames, setUsernames] = useState({
    github: "",
    leetcode: "",
    codeforces: "",
  });

  const [platformData, setPlatformData] = useState({});
  const [streak, setStreak] = useState(0);

  const platforms = [
    { key: "github", name: "GitHub" },
    { key: "leetcode", name: "LeetCode" },
    { key: "codeforces", name: "Codeforces" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("usernames");
    if (saved) setUsernames(JSON.parse(saved));

    const savedStreak = localStorage.getItem("grindmapStreak");
    if (savedStreak) {
      const streakData = JSON.parse(savedStreak);
      setStreak(streakData.count || 0);
    }

    // Load platform data from localStorage if available
    const savedPlatformData = localStorage.getItem("platformData");
    if (savedPlatformData) {
      setPlatformData(JSON.parse(savedPlatformData));
    }
  }, []);

  const handleRedirect = (platformKey) => {
    const urls = {
      github: `https://github.com/${usernames.github}`,
      leetcode: `https://leetcode.com/${usernames.leetcode}`,
      codeforces: `https://codeforces.com/profile/${usernames.codeforces}`,
    };

    const url = urls[platformKey];

    if (url && usernames[platformKey]) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="platforms-page">
      <h1>Platform Overview</h1>
      <p className="platforms-subtitle">
        Track your progress across multiple coding platforms
      </p>

      <div className="platforms-grid">
        {/* GrindMap Streak Card */}
        <PlatformCard
          key="streak"
          name="GrindMap Streak"
          platformKey="streak"
          data={streak}
          onClick={() => {}}
        />

        {platforms.map((plat) => (
          <PlatformCard
            key={plat.key}
            name={plat.name}
            platformKey={plat.key}
            data={platformData[plat.key]}
            onClick={() => handleRedirect(plat.key)}
          />
        ))}
      </div>
    </div>
  );
}

export default PlatformsPage;

