import React from 'react';
import { useWebSocket } from '../../context/WebSocketContext';
import RawMaterialResponsiveBarChart from './RawMaterialResponsiveBarChart';

const RawMaterialUsage = () => {
    const { rawMaterialUsage } = useWebSocket();
  
    const chartData = rawMaterialUsage.map(item => ({
      material: item.materialName,
      used: item.totalUsage,
  }));

  return (
      <RawMaterialResponsiveBarChart
          data={chartData}
          title="Raw Material Usage"
          dateRange="Last 30 Days"
      />
  );
  };

export default RawMaterialUsage;