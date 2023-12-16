import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const SpecificCountiesPieChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
        }]
    });

    const selectedCounties = [
        'los angeles',
        'san diego',
        'orange',
        'riverside',
        'san bernardino',
        'santa clara',
        'alameda',
        'sacramento',
        'san francisco',
        'fresno'
    ];

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#e65100', '#33691e', '#ff1744', '#311b92', '#e040fb'];

    const fetchData = async () => {
        try {
            const response = await axios.get('https://disease.sh/v3/covid-19/historical/usacounties/california?lastdays=15');
            const filteredData = response.data
                .filter(county => selectedCounties.includes(county.county))
                .map((county, index) => ({
                    name: county.county,
                    cases: Object.values(county.timeline.cases).slice(-1)[0], // Get the latest case count
                    color: colors[index % colors.length]
                }));

            setChartData({
                labels: filteredData.map(c => c.name),
                datasets: [{
                    data: filteredData.map(c => c.cases),
                    backgroundColor: filteredData.map(c => c.color),
                    hoverBackgroundColor: filteredData.map(c => c.color),
                }]
            });
        } catch (error) {
            console.error("Error fetching county data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div>
        <h3 className="title-for-graph">Covid Cases Per County</h3>
        <Pie data={chartData} />
      </div>
    );
};

export default SpecificCountiesPieChart;
