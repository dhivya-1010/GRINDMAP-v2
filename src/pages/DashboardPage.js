import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodayActivity from "../components/TodayActivity";
import ProblemStats from "../components/ProblemStats";
import StreakAlert from "../components/StreakAlert";
import { notificationService } from "../services/notificationService";
import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState({
    github: "",
    leetcode: "",
    codeforces: "",
  });

  const [platformData, setPlatformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const platforms = [
    { key: "github", name: "GitHub" },
    { key: "leetcode", name: "LeetCode" },
    { key: "codeforces", name: "Codeforces" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("usernames");
    if (saved) setUsernames(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("usernames", JSON.stringify(usernames));
  }, [usernames]);

  const handleChange = (key, value) => {
    setUsernames((prev) => ({ ...prev, [key]: value }));
  };

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

  const fetchAll = async () => {
    setLoading(true);
    setError("");

    try {
      const newData = {};
      const promises = [];

      if (usernames.github) {
        promises.push(
          fetch("http://localhost:3001/api/scrape", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              platform: "github",
              username: usernames.github,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                newData.github = data.data;
                newData.heatmap = data.data.heatmap || [];
              }
            })
            .catch((err) => console.error("GitHub fetch error:", err)),
        );
      }

      if (usernames.leetcode) {
        promises.push(
          fetch("http://localhost:3001/api/scrape", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              platform: "leetcode",
              username: usernames.leetcode,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                newData.leetcode = data.data;
              }
            })
            .catch((err) => console.error("LeetCode fetch error:", err)),
        );
      }

      if (usernames.codeforces) {
        promises.push(
          fetch("http://localhost:3001/api/scrape", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              platform: "codeforces",
              username: usernames.codeforces,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                newData.codeforces = data.data;
              }
            })
            .catch((err) => console.error("Codeforces fetch error:", err)),
        );
      }

      await Promise.all(promises);

      // Calculate streak based on activity
      const hasActivityToday =
        newData.github?.publicRepos > 0 ||
        newData.leetcode?.totalSolved > 0 ||
        newData.codeforces?.solved > 0;

      const today = new Date().toISOString().split("T")[0];
      const savedStreak = localStorage.getItem("grindmapStreak");
      let streakData = savedStreak
        ? JSON.parse(savedStreak)
        : { count: 0, lastDate: null };

      // Check for streak break BEFORE updating
      if (streakData.lastDate && streakData.count > 0) {
        const lastDate = new Date(streakData.lastDate);
        const todayDate = new Date(today);
        const daysDifference = Math.floor(
          (todayDate - lastDate) / (1000 * 60 * 60 * 24),
        );

        // If streak is broken (more than 1 day gap and no activity today)
        if (daysDifference > 1 && !hasActivityToday) {
          const notificationSent = localStorage.getItem(
            "streakBrokenNotificationSent",
          );

          // Only send notification once per broken streak
          if (notificationSent !== today) {
            await notificationService.checkAndNotifyStreakBreak(
              streakData,
              hasActivityToday,
            );
          }

          // Reset streak
          streakData.count = 0;
          streakData.lastDate = null;
        }
      }

      // Update streak if there's activity today
      if (hasActivityToday) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (
          streakData.lastDate === yesterday ||
          streakData.lastDate === yesterdayStr
        ) {
          if (streakData.lastDate !== today) {
            streakData.count += 1;
            streakData.lastDate = today;
          }
        } else if (streakData.lastDate !== today) {
          streakData.count = 1;
          streakData.lastDate = today;
        }

        localStorage.setItem("grindmapStreak", JSON.stringify(streakData));
      }

      setPlatformData(newData);
      // Save to localStorage for other pages
      localStorage.setItem("platformData", JSON.stringify(newData));

      // Redirect to platforms page
      navigate("/platforms");
    } catch (err) {
      console.error(err);
      setError(
        "Failed to fetch data. Make sure backend is running on port 3001.",
      );
    }

    setLoading(false);
  };

  const totalSolved =
    (platformData.leetcode?.totalSolved || 0) +
    (platformData.codeforces?.solved || 0);

  const totalProblems = 4000;

  const todayISO = new Date().toISOString().split("T")[0];

  const todayGithubActivity =
    platformData.heatmap?.find((d) => d.date === todayISO)?.count || 0;

  const todayCodeforces = platformData.codeforces?.todaySubmissions || 0;

  return (
    <div className="dashboard-page">
      <StreakAlert />
      <h1>Dashboard</h1>

      {/* USERNAME INPUT */}
      <div className="username-inputs">
        <h2>Enter Usernames</h2>

        {platforms.map((plat) => (
          <div key={plat.key} className="input-group">
            <label>{plat.name}</label>
            <input
              type="text"
              value={usernames[plat.key]}
              onChange={(e) => handleChange(plat.key, e.target.value)}
              placeholder={`Enter ${plat.name} username`}
            />
          </div>
        ))}

        <button onClick={fetchAll} disabled={loading}>
          {loading ? "Loading..." : "Fetch All Platforms"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {/* TODAY ACTIVITY */}
      <TodayActivity
        github={todayGithubActivity}
        leetcode={platformData.leetcode?.totalSolved || 0}
        codeforces={todayCodeforces}
        onRedirect={handleRedirect}
      />

      {/* PROBLEM STATS */}
      <ProblemStats solved={totalSolved} total={totalProblems} />
    </div>
  );
}

export default DashboardPage;
