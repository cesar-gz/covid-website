import React from 'react';
import Table from './Table';
import CovidDailyTable from './CovidDailyTable';

const Dashboard = () => {
    return (
        <div>
            <div className="dashboard">
                <div className="dashboard-slot">
                    <Table />
                </div>
                <div className="dashboard-slot">
                    <CovidDailyTable />
                </div>
                <div className="dashboard-slot">
                    {/* third table component goes here */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
