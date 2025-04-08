import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const RawMaterialResponsiveBarChart = ({ data, title, dateRange }) => {
  const isRawMaterial = title === "Raw Material Usage";

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h3>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        {dateRange}
      </p>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          {isRawMaterial ? null : (
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          )}
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="sold"
            name={isRawMaterial ? "Quantity Used" : "Units Sold"}
            fill="#8884d8"
            barSize={30}
          />
          {isRawMaterial ? null : (
            <Bar
              yAxisId="right"
              dataKey="revenue"
              name="Revenue"
              fill="#82ca9d"
              barSize={30}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RawMaterialResponsiveBarChart;