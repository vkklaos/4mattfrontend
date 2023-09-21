import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // eslint-disable-line no-unused-vars

const LineChart = ({ data }) => {
  return (
    <div>
      <Line
        data={data}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default LineChart;