import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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
        datasets: [{
          label: '',
          data: [],
          backgroundColor: '',
          borderColor: '',
          borderWidth: 1,
      }]
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
            console.log(response)
            const dates = Object.keys(response.data.cases);
            const caseCounts = Object.values(response.data.cases);

            setChartData({
                labels: dates,
                datasets: [
                    {
                        label: 'Global COVID-19 Cases Over Time',
                        data: caseCounts,
                        backgroundColor: '#b71c1c',
                        borderColor: '#f44336',
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
