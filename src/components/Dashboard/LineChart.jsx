import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import CommonChart from "./CommonChart";
function LineChart() {
  const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"];

  return (
    <CommonChart value="306" label="Subscription">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: `Dataset`,
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </CommonChart>
  );
}

export default LineChart;
