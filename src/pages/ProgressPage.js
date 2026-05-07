import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodayActivity from "../components/TodayActivity";
import ProblemStats from "../components/ProblemStats";
import StreakAlert from "../components/StreakAlert";
import "./DashboardPage.css";

function DashboardPage() {

  const navigate = useNavigate();

  const [usernames, setUsernames] =
    useState({
      github: "",
      leetcode: "",
      codeforces: "",
    });

  const [platformData, setPlatformData] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const platforms = [
    {
      key: "github",
      name: "GitHub",
    },

    {
      key: "leetcode",
      name: "LeetCode",
    },

    {
      key: "codeforces",
      name: "Codeforces",
    },
  ];

  // ================= LOAD SAVED DATA =================

  useEffect(() => {

    const savedUsernames =
      localStorage.getItem(
        "usernames"
      );

    if (savedUsernames) {

      setUsernames(
        JSON.parse(savedUsernames)
      );

    }

    const savedPlatformData =
      localStorage.getItem(
        "platformData"
      );

    if (savedPlatformData) {

      setPlatformData(
        JSON.parse(savedPlatformData)
      );

    }

  }, []);

  // ================= HANDLE INPUT CHANGE =================

  const handleChange = (
    key,
    value
  ) => {

    const updated = {
      ...usernames,
      [key]: value,
    };

    setUsernames(updated);

    localStorage.setItem(
      "usernames",
      JSON.stringify(updated)
    );
  };

  // ================= REDIRECT =================

  const handleRedirect = (
    platformKey
  ) => {

    const urls = {
      github:
        `https://github.com/${usernames.github}`,

      leetcode:
        `https://leetcode.com/${usernames.leetcode}`,

      codeforces:
        `https://codeforces.com/profile/${usernames.codeforces}`,
    };

    const url = urls[platformKey];

    if (
      url &&
      usernames[platformKey]
    ) {

      window.open(
        url,
        "_blank"
      );

    }
  };

  // ================= FETCH REAL DATA =================

  const fetchAll = async () => {

    setLoading(true);

    setError("");

    try {

      const newData = {};

      // ================= GITHUB =================

      if (usernames.github) {

        const githubRes =
          await fetch(
            `https://api.github.com/users/${usernames.github}`
          );

        const githubData =
          await githubRes.json();

        newData.github = {

          publicRepos:
            githubData.public_repos ||
            0,

          followers:
            githubData.followers ||
            0,

          heatmap: [
            {
              date:
                new Date()
                  .toISOString()
                  .split("T")[0],

              count: 5,
            },
          ],
        };
      }

      // ================= LEETCODE =================

      if (usernames.leetcode) {

        const lcRes =
          await fetch(
            `https://leetcode-api-faisalshohag.vercel.app/${usernames.leetcode}`
          );

        const lcData =
          await lcRes.json();

        newData.leetcode = {

          totalSolved:
            lcData.totalSolved ||
            0,

          easySolved:
            lcData.easySolved ||
            0,

          mediumSolved:
            lcData.mediumSolved ||
            0,

          hardSolved:
            lcData.hardSolved ||
            0,
        };
      }

      // ================= CODEFORCES =================

      if (usernames.codeforces) {

        // USER INFO

        const cfRes =
          await fetch(
            `https://codeforces.com/api/user.info?handles=${usernames.codeforces}`
          );

        const cfJson =
          await cfRes.json();

        const user =
          cfJson.result[0];

        // USER SUBMISSIONS

        const subRes =
          await fetch(
            `https://codeforces.com/api/user.status?handle=${usernames.codeforces}`
          );

        const subJson =
          await subRes.json();

        // UNIQUE SOLVED

        const solvedSet =
          new Set();

        subJson.result.forEach(
          (sub) => {

            if (
              sub.verdict ===
              "OK"
            ) {

              solvedSet.add(
                `${sub.problem.contestId}-${sub.problem.index}`
              );

            }
          }
        );

        newData.codeforces = {

          rating:
            user.rating || 0,

          solved:
            solvedSet.size || 0,

          todaySubmissions:
            subJson.result.filter(
              (sub) => {

                const today =
                  new Date().toDateString();

                return (
                  new Date(
                    sub.creationTimeSeconds *
                      1000
                  ).toDateString() ===
                  today
                );
              }
            ).length,
        };
      }

      // ================= SAVE =================

      setPlatformData(newData);

      localStorage.setItem(
        "platformData",
        JSON.stringify(newData)
      );
      await fetch(

  "http://localhost:3001/api/users/save",

  {

    method: "POST",

    headers: {

      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({

      github:
        usernames.github,

      leetcode:
        usernames.leetcode,

      codeforces:
        usernames.codeforces,
    }),
  }
);

      // ================= STREAK =================

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      let streakData = {

        count: 1,

        lastDate: today,
      };

      const savedStreak =
        localStorage.getItem(
          "grindmapStreak"
        );

      if (savedStreak) {

        const parsed =
          JSON.parse(
            savedStreak
          );

        if (
          parsed.lastDate !==
          today
        ) {

          streakData.count =
            (parsed.count || 0) +
            1;

        } else {

          streakData.count =
            parsed.count;

        }
      }

      localStorage.setItem(
        "grindmapStreak",
        JSON.stringify(
          streakData
        )
      );

      navigate("/platforms");

    } catch (err) {

      console.error(err);

      setError(
        "Failed to fetch platform data"
      );
    }

    setLoading(false);
  };

  // ================= STATS =================

  const totalSolved =
    (platformData.leetcode
      ?.totalSolved || 0) +
    (platformData.codeforces
      ?.solved || 0);

  const totalProblems = 4000;

  const todayISO =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayGithubActivity =
    platformData.github?.heatmap?.find(
      (d) =>
        d.date === todayISO
    )?.count || 0;

  const todayCodeforces =
    platformData.codeforces
      ?.todaySubmissions || 0;

  return (

    <div className="dashboard-page">

      <StreakAlert />

      <h1>Dashboard</h1>

      {/* ================= USERNAME INPUTS ================= */}

      <div className="username-inputs">

        <h2>
          Enter Usernames
        </h2>

        {platforms.map(
          (plat) => (

            <div
              key={plat.key}
              className="input-group"
            >

              <label>
                {plat.name}
              </label>

              <input
                type="text"
                value={
                  usernames[
                    plat.key
                  ]
                }
                onChange={(e) =>
                  handleChange(
                    plat.key,
                    e.target.value
                  )
                }
                placeholder={`Enter ${plat.name} username`}
              />

            </div>
          )
        )}

        <button
          onClick={fetchAll}
          disabled={loading}
        >

          {loading
            ? "Loading..."
            : "Fetch All Platforms"}

        </button>

        {error && (

          <p className="error">
            {error}
          </p>

        )}

      </div>

      {/* ================= TODAY ACTIVITY ================= */}

      <TodayActivity
        github={
          todayGithubActivity
        }

        leetcode={
          platformData.leetcode
            ?.totalSolved || 0
        }

        codeforces={
          todayCodeforces
        }

        onRedirect={
          handleRedirect
        }
      />

      {/* ================= PROBLEM STATS ================= */}

      <ProblemStats
        solved={totalSolved}
        total={totalProblems}
      />

    </div>
  );
}

export default DashboardPage;