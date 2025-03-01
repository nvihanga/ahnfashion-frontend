import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
} from '@mui/material';
import { ReceiptLong } from '@mui/icons-material';

const CashOut = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const [selectedSupplier, setSelectedSupplier] = useState("");

  // Sample suppliers for the dropdown
  const suppliers = ["Ambiga Textiles", "Chathura Enterprises", "Supplier 3"];

  // Sample data - replace with your actual data
  const summaryData = {
    totalPaidAmount: 'Rs. 50,000',
    totalInvoices: 30,
  };

  const [paymentData] = useState([
    {
      id1: 1,
      supplier1: 'Ambiga Textiles',
      toPay1: 'Rs. 2,000',
      placeDate1: '2024-02-12',
      id2: 2,
      supplier2: 'Chathura Enterprises',
      toPay2: 'Rs. 4,000',
      placeDate2: '2024-02-10'
    }
  ]);
  
  const [filteredPaymentData, setFilteredPaymentData] = useState(paymentData);

  const handleDateChange = (field) => (event) => {
    setDateRange({
      ...dateRange,
      [field]: event.target.value
    });
  };

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleShow = () => {
    let filteredData = paymentData;

    // Filter by supplier name if a specific supplier is selected
    if (selectedSupplier) {
      filteredData = paymentData.filter(
        (row) => row.supplier1 === selectedSupplier || row.supplier2 === selectedSupplier
      );
    }
    
    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      filteredData = filteredData.filter(
        (row) =>
          ((row.supplier1 === selectedSupplier || row.supplier2 === selectedSupplier) && 
          ((row.placeDate1 >= dateRange.startDate && row.placeDate1 <= dateRange.endDate) || 
          (row.placeDate2 >= dateRange.startDate && row.placeDate2 <= dateRange.endDate)))
      );
    }
    console.log('Filtered Data:', filteredData);
    setFilteredPaymentData(filteredData);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          {[
              {
              title: "Monthly Amount",
              value: summaryData.totalPaidAmount,
              invoices: summaryData.totalInvoices, // Assuming you have invoice data
              },
          ].map((item, index) => (
              <Paper key={index} elevation={1} className="p-4">
              <div className="flex items-center justify-between">
                  <div>
                  <Typography variant="subtitle2" className="text-gray-600">
                      {item.title}
                  </Typography>
                  <Typography variant="h5" className="font-medium">
                      {item.value}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                      {item.invoices} invoices
                  </Typography>
                  </div>
                  <IconButton className="bg-gray-100">
                  <ReceiptLong />
                  </IconButton>
              </div>
              </Paper>
          ))}
          </div>
          
      {/* Date Range Filter */}
      <Card variant="outlined">
        <CardContent className="flex items-center gap-6">
          <FormControl size="small" className="w-52">
            <TextField size="small" placeholder="Search Payment" variant="outlined" className="max-w-xs" />
          </FormControl>
          <div className="flex-grow"></div>
          <TextField size="small" type="date" value={dateRange.startDate} onChange={handleDateChange('startDate')} className="w-40" />
          <Typography variant="body2" color="textSecondary">to</Typography>
          <TextField size="small" type="date" value={dateRange.endDate} onChange={handleDateChange('endDate')} className="w-40" />
          <Button variant="contained" color="primary" onClick={handleShow}>Show</Button>
        </CardContent>
      </Card>

      {/* Payment Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 'bold'}}>INVOICE NUMBER</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>SUPPLIER</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>AMOUNT</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>INVOICE DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPaymentData.map((row1) => (
              <TableRow key={row1.id1} hover>
                <TableCell>{row1.id1}</TableCell>
                <TableCell>{row1.supplier1}</TableCell>
                <TableCell>{row1.toPay1}</TableCell>
                <TableCell>{row1.placeDate1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            {paymentData.map((row2) => (
              <TableRow key={row2.id2} hover>
                <TableCell>{row2.id2}</TableCell>
                <TableCell>{row2.supplier2}</TableCell>
                <TableCell>{row2.toPay2}</TableCell>
                <TableCell>{row2.placeDate2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CashOut;
