import React from 'react';
import CountryPieChart from './CountryPieChart';
import CovidContinentsChart from './ContinentsGraph';
import GradientPieChart from './GradientGraph';

const DashboardTwo = () => {
    return (
        <div>
            <div className="dashboard">
                <div className="dashboard-slot">
                    <CovidContinentsChart />
                </div>
                <div className="dashboard-slot">
                    <CountryPieChart />
                </div>
                <div className="dashboard-slot">
                    <GradientPieChart />
                </div>
            </div>
        </div>
    );
};

export default DashboardTwo;
