import React from 'react';
import TotalGrowthBarChart from '../widgets/TotalGrowth';
import TotalIncome from '../widgets/TotalIncome';
const Dashboard = () => {
  return (
    <div>
      <TotalIncome />
      <TotalGrowthBarChart />
    </div>
  );
};

export default Dashboard;
