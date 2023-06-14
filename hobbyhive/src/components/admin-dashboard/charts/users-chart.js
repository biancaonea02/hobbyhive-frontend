import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { userCountPerMonth } from "../../../services/user-service";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

function UsersChart() {
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "User Count",
        data: [],
        fill: true,
        backgroundColor: "#82CD47",
        borderColor: "#82CD47",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    void (async () => {
      const userCount = await userCountPerMonth();
      const userLabels = userCount?.map((item) => Object.keys(item)[0]);
      const userValues = userCount?.map((item) => Object.values(item)[0]);

      const updatedLineChartData = {
        labels: userLabels,
        datasets: [
          {
            label: "User Count",
            data: userValues,
            fill: true,
            backgroundColor: "#82CD47",
            borderColor: "#82CD47",
            tension: 0.1,
          },
        ],
      };

      if (lineChartData.datasets) {
        updatedLineChartData.datasets[0] = {
          ...lineChartData.datasets[0],
          data: userValues,
        };
      }
      setLineChartData(updatedLineChartData);
    })();
  }, []);
  return <Line data={lineChartData} options={lineChartOptions} />;
}

export default UsersChart;
