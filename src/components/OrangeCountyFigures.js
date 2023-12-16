import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

async function fetchCovidData() {
  const url =
    "https://storage.googleapis.com/covid19-open-data/v3/location/US_CA_06059.json";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    return new Promise.reject(error);
  }
}

export function OCChart() {
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

  useEffect(() => {
    let ignore = false;
    fetchCovidData().then((data) => {
      if (!ignore) {
        // set chart data
        const dates = data.data.map((row) => row[1]);
        const deaths = data.data.map((row) => row[17] || 0);

        setChartData({
          labels: dates.slice(90, 863),
          datasets: [
            {
              label: "Cumulative Deaths",
              data: deaths.slice(90, 863),
              backgroundColor: "#b71c1c",
              borderColor: "#f44336",
              borderWidth: 1,
            },
          ],
        });
      }
    });
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div className="chart-container">
        <Bar data={chartData} />
      </div>
  )
}
