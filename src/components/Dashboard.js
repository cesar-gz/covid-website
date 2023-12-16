import React from 'react';
import Table from './Table';
import CovidDailyTable from './CovidDailyTable';
import OCTable from './OCTable';

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
                    <OCTable />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
