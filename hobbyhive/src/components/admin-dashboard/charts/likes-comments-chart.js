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
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getLikesCommentsCount } from "../../../services/post-service";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label;
          const value = context.parsed;
          const index = context.dataIndex;

          if (label === "Likes") {
            return `Likes Count: ${value}`;
          } else if (label === "Comments") {
            return `Comments Count: ${value}`;
          }

          return "";
        },
      },
    },
  },
};

function LikesCommentsChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Likes & Comments Count",
        data: [],
        fill: true,
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 1,
        tension: 0.1,
        backgroundColor: ["#A0D8B3", "rgb(54, 162, 235)"],
      },
    ],
  });

  useEffect(() => {
    void (async () => {
      const likesCommentsCount = await getLikesCommentsCount();
      const likesCommentsLabels = likesCommentsCount?.map(
        (item) => Object.keys(item)[0]
      );
      const likesCommentsValues = likesCommentsCount?.map(
        (item) => Object.values(item)[0]
      );

      const updatedChartData = {
        labels: likesCommentsLabels,
        datasets: [
          {
            label: "Likes & Comments Count",
            data: likesCommentsValues,
            fill: true,
            tension: 0.1,
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          },
        ],
      };

      if (chartData.datasets) {
        updatedChartData.datasets[0] = {
          ...chartData.datasets[0],
          data: likesCommentsValues,
        };
      }
      setChartData(updatedChartData);
    })();
  }, []);
  return <Doughnut data={chartData} options={lineChartOptions} />;
}

export default LikesCommentsChart;
