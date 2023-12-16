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

export default function OrangeCountyFigures() {
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
  const [covidData, setCovidData] = useState([]);
  const columns = useMemo(
    () => [
      { Header: "Date", accessor: 1 },
      { Header: "Cases", accessor: 16 },
      { Header: "New", accessor: 14 },
      { Header: "Deaths", accessor: 17 },
      { Header: "New", accessor: 15 },
      { Header: "Vaccinated", accessor: 19 },
      { Header: "Population", accessor: 20 },
    ],
    []
  );

  useEffect(() => {
    let ignore = false;
    fetchCovidData().then((data) => {
      if (!ignore) {
        setCovidData(data.data);
        // set chart data
        const dates = data.data.map((row) => row[1]);
        const deaths = data.data.map((row) => row[17] || 0);

        setChartData({
          lables: dates.slice(90, 863),
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
    <>
      <div className="chart-container">
        <h1>Orange County COVID-19 New Deaths Chart</h1>
        <Bar data={chartData} />
      </div>
      <div className="figures-container">
        <h1>Orange County COVID-19 Data Figures Table</h1>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                {columns.map((column, idx) => (
                  <th key={column.Header + idx}>{column.Header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {covidData.map((row) => (
                <tr key={Math.random()}>
                  {columns.map((column, idx) => (
                    <td key={column.accessor + idx}>
                      {row[column.accessor] || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}