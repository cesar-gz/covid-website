import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ContinentPieChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        }],
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('https://disease.sh/v3/covid-19/continents');
            const selectedContinents = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Australia-Oceania'];
            const continentData = response.data.filter(continent => selectedContinents.includes(continent.continent));
            setChartData({
                labels: continentData.map(continent => continent.continent),
                datasets: [{
                    data: continentData.map(continent => continent.cases),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#e65100'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#e65100'],
                }],
            });
        } catch (error) {
            console.error("Error fetching continent data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div>
        <div>
          <h3 className="title-for-graph">Covid Cases Per Continent</h3>
          <Pie data={chartData} />
        </div>
      </div>
    );
};

export default ContinentPieChart;
