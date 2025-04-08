import React from 'react';
import PropTypes from 'prop-types';

const ReportTable = ({ selectedMonths = [], supplierReports = [], grandTotal }) => {
  if (supplierReports.length === 0) {
    return <div className="text-gray-500 mt-4 text-center py-8">No data available for selected period</div>;
  }
  
  return (
    <div className="overflow-x-auto mt-6 shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 border-collapse" id="reportTable">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Supplier
            </th>
            {selectedMonths.map((month) => (
              <th
                key={month}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                {month}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {supplierReports.map((supplier) => (
            <tr key={supplier.supplierCode} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{supplier.supplierName}</div>
                <div className="text-xs text-gray-500">{supplier.supplierCode}</div>
              </td>
              {selectedMonths.map((month) => (
                <td 
                  key={month} 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                >
                  Rs. {supplier.monthlyTotals[month]?.toFixed(2) || '0.00'}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Rs. {supplier.total?.toFixed(2) || '0.00'}
              </td>
            </tr>
          ))}
        </tbody>
        {grandTotal !== undefined && (
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Grand Total
              </td>
              {selectedMonths.map((month) => (
                <td key={month} className="px-6 py-4 whitespace-nowrap"></td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                Rs. {grandTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

ReportTable.propTypes = {
  selectedMonths: PropTypes.arrayOf(PropTypes.string),
  supplierReports: PropTypes.arrayOf(PropTypes.shape({
    supplierCode: PropTypes.string,
    supplierName: PropTypes.string,
    monthlyTotals: PropTypes.object,
    total: PropTypes.number
  })),
  grandTotal: PropTypes.number
};

export default ReportTable;