import React, { useState, useEffect } from "react";
import "./StreakAlert.css";

/**
 * StreakAlert Component
 * Shows warning if streak is about to break or has broken
 */
function StreakAlert() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("warning"); // warning, danger, success

  useEffect(() => {
    checkStreakStatus();
  }, []);

  const checkStreakStatus = () => {
    const streakData = JSON.parse(localStorage.getItem("grindmapStreak") || "{}");
    
    if (!streakData.lastDate || !streakData.count) {
      return; // No streak yet
    }

    const today = new Date().toISOString().split("T")[0];
    const lastDate = new Date(streakData.lastDate);
    const todayDate = new Date(today);
    const daysDifference = Math.floor(
      (todayDate - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference === 0) {
      // Streak is active today
      setAlertType("success");
      setAlertMessage(`🔥 Great! Your ${streakData.count} day streak is active!`);
    } else if (daysDifference === 1) {
      // Warning: streak will break if no activity today
      setAlertType("warning");
      setAlertMessage(
        `⚠️ Warning: Code today to maintain your ${streakData.count} day streak!`
      );
    } else if (daysDifference > 1) {
      // Streak broken
      setAlertType("danger");
      setAlertMessage(
        `❌ Streak broken! You missed ${daysDifference} days. Faculty has been notified.`
      );
    }
  };

  if (!alertMessage) return null;

  return (
    <div className={`streak-alert streak-alert-${alertType}`}>
      <div className="streak-alert-icon">
        {alertType === "success" && "✅"}
        {alertType === "warning" && "⚠️"}
        {alertType === "danger" && "🚨"}
      </div>
      <div className="streak-alert-message">{alertMessage}</div>
      <button
        className="streak-alert-close"
        onClick={() => setAlertMessage(null)}
      >
        ✕
      </button>
    </div>
  );
}

export default StreakAlert;

