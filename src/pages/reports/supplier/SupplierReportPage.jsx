import React, { useState } from 'react';
import { purchaseOrderApi } from '../../../api/purchaseOrderApi';
import DatePicker from '../../../components/reports/supplier/DatePicker';
import ReportTable from '../../../components/reports/supplier/ReportTable';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF from '../../../components/reports/supplier/ReportPDF';

const SupplierReportPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      setLoading(true);
      const response = await purchaseOrderApi.get('/generateMonthlyReport', {
        params: { 
          startDate: startDate.slice(0, 7),
          endDate: endDate.slice(0, 7)
        }
      });
      
      setReportData(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Supplier Purchase Order Report</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleGenerateReport} className="flex gap-4 items-end mb-6">
          <DatePicker
            label="Start Month"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <DatePicker
            label="End Month"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </form>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {reportData && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Report Period:{" "}
                {reportData.selectedMonths?.length > 0 ? (
                  <>
                    {reportData.selectedMonths[0]} -{" "}
                    {reportData.selectedMonths[reportData.selectedMonths.length - 1]}
                  </>
                ) : (
                  "No period available"
                )}
              </h2>
              <PDFDownloadLink
                document={
                  <ReportPDF
                    selectedMonths={reportData.selectedMonths}
                    supplierReports={reportData.supplierReports}
                    grandTotal={reportData.grandTotal}
                  />
                }
                fileName="supplier-report.pdf"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
              </PDFDownloadLink>
            </div>
            
            <ReportTable
              selectedMonths={reportData.selectedMonths || []}
              supplierReports={reportData.supplierReports || []}
              grandTotal={reportData.grandTotal}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SupplierReportPage;