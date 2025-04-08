// ProductPerformance.jsx
import React from 'react';
import { useWebSocket } from '../../context/WebSocketContext';
import ResponsiveBarChart from './ResponsiveBarChart';

const ProductPerformance = () => {
  const sampleProductPerformance = [
    { productName: 'T-Shirt', unitsSold: 11, totalRevenue: 279.00 },
    { productName: 'Jeans', unitsSold: 4, totalRevenue: 200.00 },
    { productName: 'Jacket', unitsSold: 1, totalRevenue: 75.00 },
  ];
  // const { productPerformance } = useWebSocket();

  // // Transform WebSocket data to match chart structure
  // const chartData = productPerformance.map(item => ({
  //   product: item.productName,
  //   sold: item.totalSold,
  //   revenue: item.totalRevenue
  // }));

  const chartData = sampleProductPerformance.map(item => ({
    product: item.productName,
    sold: item.unitsSold,    // Matches the BarChart dataKey
    revenue: item.totalRevenue
  }));

  return (
    <ResponsiveBarChart
      data={chartData}
      title="Top Selling Products"
      dateRange="September 2023"
    />
  );
};

export default ProductPerformance;
