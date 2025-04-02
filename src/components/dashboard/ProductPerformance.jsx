import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ResponsiveBarChart = ({
  data,
  title = 'Top Selling Products',
  barColor = '#3B82F6',
  borderRadius = [4, 4, 4, 4],
  textColor = '#4B5563',
  tooltipBackground = '#ffffff',
  tooltipBorder = '#e5e7eb',
  dateRange = 'September 2023'
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [containerHeight, setContainerHeight] = useState(400);
  const [barSize, setBarSize] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setContainerHeight(window.innerWidth < 768 ? 300 : 400);
      setBarSize(window.innerWidth < 768 ? 20 : 30);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sort data by sold units (descending)
  const sortedData = [...data].sort((a, b) => b.sold - a.sold);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4" style={{ color: textColor }}>
        {title} - {dateRange}
      </h2>
      
      <div className={`h-[${containerHeight}px] lg:h-[450px]`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={sortedData} 
            margin={isMobile ? 
              { top: 10, right: 10, left: 10, bottom: 70 } : 
              { top: 20, right: 20, left: 30, bottom: 50 }
            }
            barCategoryGap={isMobile ? '10%' : '15%'}
          >
            <XAxis 
              dataKey="product" 
              angle={isMobile ? -90 : -45}
              textAnchor="end" 
              height={isMobile ? 100 : 70}
              tick={{
                fill: textColor,
                fontSize: isMobile ? 10 : 12
              }}
              interval={0}
            />
            
            <YAxis 
              tick={{ 
                fill: textColor,
                fontSize: isMobile ? 10 : 12
              }}
              tickFormatter={(value) => `${value}${isMobile ? '' : ' units'}`}
              width={isMobile ? 60 : 80}
            />
            
            <Tooltip
              contentStyle={{
                background: tooltipBackground,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '6px',
                color: textColor,
                fontSize: isMobile ? 12 : 14
              }}
              formatter={(value) => [`${value} units`, 'Sold']}
              itemStyle={{ color: barColor }}
            />

            <Bar 
              dataKey="sold"
              fill={barColor}
              radius={borderRadius}
              barSize={barSize}
              animationDuration={400}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-sm" style={{ color: textColor }}>
        <span className="hidden md:inline">
          Showing top {sortedData.length} products | 
        </span>
        Total {sortedData.reduce((sum, p) => sum + p.sold, 0)} units sold
      </div>
    </div>
  );
};

// Example usage
const ProductPerformance = () => {
  const productData = [
    { product: 'Summer Dress', sold: 320 },
    { product: 'Winter Coat', sold: 285 },
    { product: 'Casual Shirt', sold: 245 },
    { product: 'Formal Pants', sold: 210 },
    { product: 'Evening Gown', sold: 180 },
    { product: 'Denim Jacket', sold: 170 },
    { product: 'Sports T-shirt', sold: 160 },
    { product: 'Silk Scarf', sold: 150 },
    { product: 'Leather Handbag', sold: 140 },
    { product: 'Woolen Sweater', sold: 130 },
  ];

  return (
    <ResponsiveBarChart
      data={productData}
      barColor="#3B82F6"
      borderRadius={[6, 6, 6, 6]}
      textColor="#334155"
      tooltipBackground="#f8fafc"
    />
  );
};

export default ProductPerformance;