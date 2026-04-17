import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const ActivityHeatmap = ({ data }) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return (
    <div className="heatmap-wrapper">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data || []}
        classForValue={(value) => {
          if (!value || value.count === 0)
            return "color-empty";
          return `color-scale-${Math.min(
            value.count,
            4
          )}`;
        }}
      />
    </div>
  );
};

export default ActivityHeatmap;
