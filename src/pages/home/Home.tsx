import React from 'react';
import ReportView from '../../features/ReportView';
import data from '../../data';
import reportConfig from '../../reportConfig';

const Home: React.FC = () => {
  const employees = data.getEmployees();
  return (
    <div>
      <h2>Report View:</h2>
      <ReportView config={reportConfig} data={employees} />
    </div>
  );
};

export default Home;
