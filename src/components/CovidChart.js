import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CovidChart = () => {
  // set up the initial state
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
        borderColor: "",
        borderWidth: 1,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      // console.log(response)
      const dates = Object.keys(response.data.cases);
      const caseCounts = Object.values(response.data.cases);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "COVID-19 Cases",
            data: caseCounts,
            backgroundColor: "#b71c1c",
            borderColor: "#f44336",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default CovidChart;
