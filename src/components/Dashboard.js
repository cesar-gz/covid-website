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
                    <h3 className="title-for-graph">placeholder for chart</h3>
                    {/* third chart component goes here */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
