import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // eslint-disable-line no-unused-vars

const PieChart = ({ data }) => {
  return (
    <div>
      <Pie data={data} options={{maintainAspectRatio: false}} />
    </div>
  );
};

export default PieChart;