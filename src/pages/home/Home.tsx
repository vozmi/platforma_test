import React from 'react';
import ReportView from '../../features/ReportView';
import data from '../../data';

const Home: React.FC = () => {
  const employees = data.getEmployees();
  return (
    <div>
      <h2>Report View:</h2>
      <ReportView employees={employees} />
    </div>
  );
};

export default Home;
