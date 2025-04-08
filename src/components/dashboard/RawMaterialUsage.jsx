import React from 'react';
import { useWebSocket } from '../../context/WebSocketContext';
import RawMaterialResponsiveBarChart from './RawMaterialResponsiveBarChart';

const RawMaterialUsage = () => {
    const { rawMaterialUsage } = useWebSocket();
  
    console.log("Raw Material Usage from WebSocket:", rawMaterialUsage);
  
    if (!rawMaterialUsage.length) {
      return <div>Loading raw material usage data...</div>;
    }
  
    const chartData = rawMaterialUsage.map(item => ({
      material: item.materialName,
      used: item.quantityUsed,
    }));
    console.log("Transformed Chart Data:", chartData);
  
    return (
      <RawMaterialResponsiveBarChart
        data={chartData}
        title="Raw Material Usage"
        dateRange="September 2023"
      />
    );
  };

export default RawMaterialUsage;