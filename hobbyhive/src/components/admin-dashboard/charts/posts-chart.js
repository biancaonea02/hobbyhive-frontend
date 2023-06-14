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
import { Bar } from "react-chartjs-2";
import { postsCountPerMonth } from "../../../services/post-service";

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

function PostsChart() {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Posts Count",
        data: [],
        fill: false,
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 1,
        tension: 0.1,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
      },
    ],
  });

  useEffect(() => {
    void (async () => {
      const postCount = await postsCountPerMonth();
      const postLabels = postCount?.map((item) => Object.keys(item)[0]);
      const postValues = postCount?.map((item) => Object.values(item)[0]);

      const updatedBarChartData = {
        labels: postLabels,
        datasets: [
          {
            label: "Post Count",
            data: postValues,
            fill: false,
            tension: 0.1,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
            ],
          },
        ],
      };

      if (barChartData.datasets) {
        updatedBarChartData.datasets[0] = {
          ...barChartData.datasets[0],
          data: postValues,
        };
      }
      setBarChartData(updatedBarChartData);
    })();
  }, []);
  return <Bar data={barChartData} options={lineChartOptions} />;
}

export default PostsChart;
