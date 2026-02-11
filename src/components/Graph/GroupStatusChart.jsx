import React from "react";
import "./GroupChart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

import IsometricBar from "./IsometricBar";

const COLORS = {
  total: "#f472b6",
  active: "#a78bfa",
  inactive: "#f87171"
};

export default function GroupStatusChart({ data, onBarReport }) {
  const active = data.filter(d => d.status === "Active");
  const inactive = data.filter(d => d.status !== "Active");

  const chartData = [
    { name: "Total", count: data.length, type: "total" },
    { name: "Active", count: active.length, type: "active" },
    { name: "Inactive", count: inactive.length, type: "inactive" }
  ];

  const handleBarClick = (entry) => {
    if (entry.type === "active") onBarReport(active);
    else if (entry.type === "inactive") onBarReport(inactive);
    else onBarReport(data);
  };
  const maxCount = Math.max(...chartData.map(d => d.count));
  const yDomain = [0, Math.ceil(maxCount * 1.2)];
  return (
    <div className="group-chart">
      <h2>Group Status Overview</h2>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
         <YAxis domain={yDomain} allowDecimals={false} />
          <Tooltip />

          <Bar
            dataKey="count"
            barSize={70}
            shape={(props) => (
              <IsometricBar
                {...props}
                fill={COLORS[props.payload.type]}
                onClick={() => handleBarClick(props.payload)}
              />
            )}
          >
            <LabelList
              dataKey="count"
              position="top"
              fill="#333"
              fontWeight="700"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
