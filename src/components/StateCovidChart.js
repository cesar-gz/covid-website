import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StateCovidChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
    borderColor: "",
    backgroundColor: "",
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: false,
        grid: {
          borderDash: [3, 3],
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    },
  };

  const statesToPlot = [
    "California",
    "Texas",
    "Florida",
    "New York",
    "Pennsylvania",
    "Ohio",
    "Michigan",
    "Georgia",
    "Missouri",
    "Washington",
    "Virginia",
    "Arizona",
    "Massachusetts",
    "Tennessee",
    "Indiana",
    "Wisconsin",
    "Colorado",
    "Minnesota",
    "South Carolina",
    "Alabama",
    "Louisiana",
    "Kentucky",
    "Oklahoma",
    "Oregon",
    "North Dakota",
  ];

  const colors = [
    "rgb(255, 99, 132)",
    "rgb(275, 192, 192)",
    "rgb(255, 205, 86)",
    "rgb(201, 103, 207)",
    "rgb(154, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(55, 159, 64)",
    "rgb(255, 99, 12)",
    "rgb(75, 122, 192)",
    "rgb(255, 5, 86)",
    "rgb(201, 203, 207)",
    "rgb(94, 162, 235)",
    "rgb(153, 102, 5)",
    "rgb(255, 59, 64)",
    "rgb(5, 99, 132)",
    "rgb(75, 192, 192)",
    "rgb(25, 205, 86)",
    "rgb(201, 203, 107)",
    "rgb(54, 102, 235)",
    "rgb(153, 102, 85)",
    "rgb(255, 159, 64)",
    "rgb(155, 99, 132)",
    "rgb(75, 192, 292)",
    "rgb(255, 105, 86)",
    "rgb(101, 43, 207)",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/nyt/states?lastdays=1"
      );

      const datasets = statesToPlot.map((state, index) => {
        const stateData = response.data.filter(
          (record) => record.state === state
        );
        const cases = stateData.map((record) => record.cases);

        return {
          label: `${state}`,
          data: cases,
          borderColor: colors[index],
          backgroundColor: colors[index],
          tension: 0.1,
        };
      });

      setChartData({
        labels: response.data
          .filter((record) => record.state === "California")
          .map((record) => record.date),
        datasets: datasets,
      });
    } catch (error) {
      console.error("Error fetching state COVID data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StateCovidChart;
