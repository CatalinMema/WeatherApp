import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart({ data, day }) {
  return (
    <>
      <h2>{day}</h2>
      <br />
      <ResponsiveContainer width="100%" aspect={4}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal="true" vertical="" stroke="#243240" />
          <XAxis
            padding={{ right: 70 }}
            label={{ value: "Hours", position: "insideBottomRight" }}
            dataKey="hour"
            tick={{ fill: "black" }}
          />
          <YAxis
            padding={{ top: 60 }}
            label={{
              fontSize: "20px",

              value: `Temp`,
              position: "insideTopLeft",
            }}
            tick={{ fill: "black" }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#8884d8", color: "black" }}
            itemStyle={{ color: "black" }}
            cursor={true}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="black"
            strokeWidth="5"
            dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }}
            activeDot={{
              fill: "#2e4355",
              stroke: "#8884d8",
              strokeWidth: 5,
              r: 10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
export default Chart;
