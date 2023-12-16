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

const CountryPieChart = () => {
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
            const response = await axios.get('https://disease.sh/v3/covid-19/countries');
            const selectedCountries = ['US', 'BR', 'IN', 'RU', 'GB', 'AU', 'CN', 'IL', 'UA', 'MX'];
            const countryData = response.data.filter(country => selectedCountries.includes(country.countryInfo.iso2));
            setChartData({
                labels: countryData.map(country => country.country),
                datasets: [{
                    data: countryData.map(country => country.deaths),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#e65100' ,'#33691e', '#ff1744', '#311b92', '#e040fb'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#e65100', '#33691e', '#ff1744', '#311b92', '#e040fb'],
                }],
            });
        } catch (error) {
            console.error("Error fetching country data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div>
        <div>
          <h3 className="title-for-graph">Covid Deaths Per Country</h3>
          <Pie data={chartData} />
        </div>
      </div>
    );
};

export default CountryPieChart;
