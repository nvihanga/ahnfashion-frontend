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
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - replace with your actual data
  const summaryData = {
    totalPaidAmount: 'Rs. 50,000',
    totalInvoices: 30,
  };

  const [paymentData] = useState([
    {
      // id1: 1,
      // supplier1: 'Ambiga Textiles',
      // toPay1: 'Rs. 2,000',
      // placeDate1: '2024-02-12',
      // id2: 2,
      // supplier2: 'Chathura Enterprises',
      // toPay2: 'Rs. 4,000',
      // placeDate2: '2024-02-10'
    }
  ]);
  
  const [filteredPaymentData, setFilteredPaymentData] = useState(paymentData);

  const handleDateChange = (field) => (event) => {
    setDateRange({
      ...dateRange,
      [field]: event.target.value
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShow = () => {
    let filteredData = paymentData;

    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter(
        (row) =>
          row.supplier1.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.supplier2.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.id1.toString().includes(searchTerm) ||
          row.id2.toString().includes(searchTerm)
      );
    }

    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      filteredData = filteredData.filter((row) => {
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        const date1 = new Date(row.placeDate1);
        const date2 = new Date(row.placeDate2);

        return (
          (date1 >= startDate && date1 <= endDate) ||
          (date2 >= startDate && date2 <= endDate)
        );
      });
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
            invoices: summaryData.totalInvoices,
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
            <TextField
              size="small"
              placeholder="Search Payment"
              variant="outlined"
              className="max-w-xs"
              value={searchTerm}
              onChange={handleSearch}
            />
          </FormControl>
          <div className="flex-grow"></div>
          <TextField
            size="small"
            type="date"
            value={dateRange.startDate}
            onChange={handleDateChange('startDate')}
            className="w-40"
          />
          <Typography variant="body2" color="textSecondary">to</Typography>
          <TextField
            size="small"
            type="date"
            value={dateRange.endDate}
            onChange={handleDateChange('endDate')}
            className="w-40"
          />
          <Button variant="contained" color="primary" onClick={handleShow}>Show</Button>
        </CardContent>
      </Card>

      {/* Payment Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 'bold'}}>INVOICE NUMBER</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>SUPPLIER NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>AMOUNT</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>INVOICE DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPaymentData.map((row) => (
              <TableRow key={row.id1} hover>
                <TableCell>{row.id1}</TableCell>
                <TableCell>{row.supplier1}</TableCell>
                <TableCell>{row.toPay1}</TableCell>
                <TableCell>{row.placeDate1}</TableCell>
              </TableRow>
            ))}
            {filteredPaymentData.map((row) => (
              <TableRow key={row.id2} hover>
                <TableCell>{row.id2}</TableCell>
                <TableCell>{row.supplier2}</TableCell>
                <TableCell>{row.toPay2}</TableCell>
                <TableCell>{row.placeDate2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CashOut;