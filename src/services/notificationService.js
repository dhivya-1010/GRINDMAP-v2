/**
 * Notification Service
 * Sends notifications when streak is broken
 */

export const notificationService = {
  /**
   * Send notification via backend API
   * @param {Object} data - Notification data
   */
  async sendStreakBrokenNotification(data) {
    try {
      const response = await fetch(
        "http://localhost:3001/api/notify/streak-broken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentEmail: data.studentEmail,
            studentName: data.studentName,
            username: data.username,
            lastActivityDate: data.lastActivityDate,
            daysMissed: data.daysMissed,
            previousStreak: data.previousStreak,
            timestamp: new Date().toISOString(),
          }),
        },
      );

      if (response.ok) {
        console.log(
          "✅ Streak broken notification sent to:",
          data.studentEmail,
        );
        return { success: true };
      } else {
        console.error("❌ Failed to send notification");
        return { success: false, error: "API error" };
      }
    } catch (error) {
      console.error("❌ Notification error:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Check if streak is broken and send notification
   * @param {Object} streakData - Current streak data from localStorage
   * @param {boolean} hasActivityToday - Whether user has activity today
   */
  async checkAndNotifyStreakBreak(streakData, hasActivityToday) {
    const today = new Date().toISOString().split("T")[0];

    if (!streakData.lastDate || !streakData.count) {
      return; // No previous streak to break
    }

    // Calculate days since last activity
    const lastDate = new Date(streakData.lastDate);
    const todayDate = new Date(today);
    const daysDifference = Math.floor(
      (todayDate - lastDate) / (1000 * 60 * 60 * 24),
    );

    // If no activity today and streak is broken (more than 1 day gap)
    if (!hasActivityToday && daysDifference > 1) {
      const userData = JSON.parse(localStorage.getItem("grindmapUser") || "{}");

      // Send notification to student's email
      await this.sendStreakBrokenNotification({
        studentEmail: userData.email || "unknown@example.com",
        studentName: userData.email?.split("@")[0] || "Student",
        username: userData.email || "Unknown",
        lastActivityDate: streakData.lastDate,
        daysMissed: daysDifference,
        previousStreak: streakData.count,
      });

      // Mark notification as sent to avoid duplicate notifications
      localStorage.setItem("streakBrokenNotificationSent", today);
    }
  },

  /**
   * Simple browser notification (fallback)
   */
  async showBrowserNotification(message) {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("GrindMap Streak Alert 🔥", {
          body: message,
          icon: "/logo192.png",
        });
      }
    }
  },
};
