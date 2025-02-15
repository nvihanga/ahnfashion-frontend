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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ReceiptLong } from '@mui/icons-material';

const SalesOrderList = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const [selectedCustomer, setSelectedCustomer] = useState("");


  // Sample customers for the dropdown
  const customers = ["Customer 1", "Customer 2", "Customer 3"];

  // Sample data - replace with your actual data
  const summaryData = {
    totalPaidAmount: 'Rs. 50,000',
    totalCreditAmount: 'Rs. 30,000',
  };

  const [salesData] = useState([
    {
      id1: 1,
      customer1: 'Customer 1',
      toPay1: 'Rs. 2,000',
      paymentMethod1: 'Cash',
      placeDate1: '2024-02-12'
    ,
      id2: 2,
      customer2: 'Customer 2',
      toPay2: 'Rs. 4,000',
      paymentMethod2: 'Credit',
      placeDate2: '2024-02-10'
    }
  ]);
  
  const [filteredSalesData, setFilteredSalesData] = useState(salesData);

  const handleDateChange = (field) => (event) => {
    setDateRange({
      ...dateRange,
      [field]: event.target.value
    });
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleShow = () => {
    let filteredData = salesData;

  // Filter by customer name if a specific customer is selected
  if (selectedCustomer) {
    filteredData = salesData.filter(
      (row) => row.customer1 === selectedCustomer || row.customer2 === selectedCustomer
    );
  }

  // Filter by date range
  if (dateRange.startDate && dateRange.endDate) {
    filteredData = filteredData.filter(
      (row) =>
        (row.placeDate1 >= dateRange.startDate && row.placeDate1 <= dateRange.endDate) ||
        (row.placeDate2 >= dateRange.startDate && row.placeDate2 <= dateRange.endDate)
    );
  }

  console.log('Filtered Data:', filteredData);
  setFilteredSalesData(filteredData);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-20">
        {[
          { title: 'Total Paid Amount', value: summaryData.totalPaidAmount },
          { title: 'Total Credit Amount', value: summaryData.totalCreditAmount },
          //{ title: 'Total To Pay', value: summaryData.totalToPay }
        ].map((item, index) => (
          <Card key={index} variant="outlined">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <Typography variant="subtitle2" color="textSecondary">
                  {item.title}
                </Typography>
                <Typography variant="h6">
                  {item.value}
                </Typography>
              </div>
              <IconButton size="small">
                <ReceiptLong />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Date Range Filter */}
      <Card variant="outlined">
        <CardContent className="flex items-center gap-6">
        <FormControl size="small" className="w-52">
            <Select
              value={selectedCustomer}
              onChange={handleCustomerChange}
              displayEmpty
            >
              <MenuItem value="">All Customers</MenuItem>
              {customers.map((customer, index) => (
                <MenuItem key={index} value={customer}>
                  {customer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/*<TextField
            size="small"
            placeholder="Search Customer..."
            variant="outlined"
            className="max-w-xs"
          />
          */}
          <div className="flex-grow"></div>
          <TextField
            size="small"
            type="date"
            value={dateRange.startDate}
            onChange={handleDateChange('startDate')}
            className="w-40"
          />
          <Typography variant="body2" color="textSecondary">
            to
          </Typography>
          <TextField
            size="small"
            type="date"
            value={dateRange.endDate}
            onChange={handleDateChange('endDate')}
            className="w-40"
          />
            <Button 
              variant="contained"
              color="primary"
              onClick={handleShow}
            >
              Show
            </Button>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Net Total</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Invoice Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSalesData.map((row1) => (
              <TableRow key={row1.id}>
                <TableCell>{row1.id1}</TableCell>
                <TableCell>{row1.customer1}</TableCell>
                <TableCell>{row1.toPay1}</TableCell>
                <TableCell>{row1.paymentMethod1}</TableCell>
                <TableCell>{row1.placeDate1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            {salesData.map((row2) => (
              <TableRow key={row2.id}>
                <TableCell>{row2.id2}</TableCell>
                <TableCell>{row2.customer2}</TableCell>
                <TableCell>{row2.toPay2}</TableCell>
                <TableCell>{row2.paymentMethod2}</TableCell>
                <TableCell>{row2.placeDate2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SalesOrderList;
