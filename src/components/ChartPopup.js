import React from "react";
import Chart from "./Chart";

function ChartPopup({ date, result, day }) {
  const dataChart = result.filter((day) => day.dt_txt.slice(0, 10) === date);
  let dataForChart = [];
  dataChart.forEach((item) => {
    dataForChart.push({
      hour: item.dt_txt.slice(10, 16),
      temp: Math.round(item.main.temp),
    });
  });
  return <Chart day={day} data={dataForChart} />;
}

export default ChartPopup;
