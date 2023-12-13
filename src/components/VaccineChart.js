import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VaccinationChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            borderColor: '',
            backgroundColor: '',
            tension: 0.1,
        }]
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=all');

            // Function to extract data for a specific country
            const extractDataForCountry = (countryCode) => {
                const countryData = response.data.find(country => country.country === countryCode);
                return countryData ? Object.values(countryData.timeline) : [];
            };

            const dates = Object.keys(response.data[0].timeline); // Assuming all countries have the same date range

            setChartData({
                labels: dates,
                datasets: [
                    {
                        label: 'USA',
                        data: extractDataForCountry('USA'),
                        borderColor: 'rgb(10, 49, 97)',
                        backgroundColor: 'rgb(10, 49, 97)',
                        tension: 0.1,
                    },
                    {
                        label: 'China',
                        data: extractDataForCountry('China'),
                        borderColor: 'rgb(238,28,37)',
                        backgroundColor: 'rgb(238,28,37)',
                        tension: 0.1,
                    },
                    {
                        label: 'India',
                        data: extractDataForCountry('India'),
                        borderColor: 'rgb(255, 205, 86)',
                        backgroundColor: 'rgb(255, 205, 86)',
                        tension: 0.1,
                    },
                    {
                        label: 'Mexico',
                        data: extractDataForCountry('Mexico'),
                        borderColor: 'rgb(0, 104, 71)',
                        backgroundColor: 'rgb(0, 104, 71)',
                        tension: 0.1,
                    }
                ]
            });
        } catch (error) {
            console.error("Error fetching vaccination data: ", error);
        }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

export default VaccinationChart;
