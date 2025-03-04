import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Card,
  CardContent,
  FormControl
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CreditOut = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  

  // Sample data for invoices
  const invoices = [
    { id: '450', customer: 'customer1', netTotal: 'Rs. 4000.00', toPay: 'Paid', date: '2024-12-18' },
    { id: '3', customer: 'customer2', netTotal: 'Rs. 990.00', toPay: 'Paid', date: '2024-11-29' },
    { id: 'INV7863', customer: 'customer3', netTotal: 'Rs. 331.50', toPay: 'Rs. 331.50', date: '2024-10-26' },
    { id: 'INV7786', customer: 'customer4', netTotal: 'Rs. 18066.75', toPay: 'Rs. 596.75', date: '2024-10-22' },
    { id: 'INV95', customer: 'customer5', netTotal: 'Rs. 18665.36', toPay: 'Rs. 18665.36', date: '2024-10-22' },
    { id: 'INV7780', customer: 'customer6', netTotal: 'Rs. 7977.25', toPay: 'Paid', date: '2024-10-22' },
    { id: 'INV87', customer: 'customer7', netTotal: 'Rs. 4267.50', toPay: 'Rs. 267.50', date: '2024-10-21' }
  ];

  const summaryData = {
    totalNetAmount: 'Rs. 577556.39',
    totalPaidAmount: 'Rs. 192110.32',
    totalToPay: 'Rs. 385446.07',
    totalInvoices: 30
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShow = () => {
    // Filter logic would go here
    console.log("Filtering with dates:", startDate, endDate);
  };

  return (
    <Container maxWidth="lg" className="py-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        <Paper elevation={1} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="subtitle2" className="text-gray-600">
                Total net Amount
              </Typography>
              <Typography variant="h5" className="font-medium">
                {summaryData.totalNetAmount}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {summaryData.totalInvoices} invoices
              </Typography>
            </div>
            <IconButton className="bg-gray-100">
              <AccessTimeIcon />
            </IconButton>
          </div>
        </Paper>
        
        <Paper elevation={1} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="subtitle2" className="text-gray-600">
                Total Paid Amount
              </Typography>
              <Typography variant="h5" className="font-medium">
                {summaryData.totalPaidAmount}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {summaryData.totalInvoices} invoices
              </Typography>
            </div>
            <IconButton className="bg-gray-100">
              <AccessTimeIcon />
            </IconButton>
          </div>
        </Paper>
        
        <Paper elevation={1} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="subtitle2" className="text-gray-600">
                Total To Pay
              </Typography>
              <Typography variant="h5" className="font-medium">
                {summaryData.totalToPay}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {summaryData.totalInvoices} invoices
              </Typography>
            </div>
            <IconButton className="bg-gray-100">
              <AccessTimeIcon />
            </IconButton>
          </div>
        </Paper>
      </div>

      {/* Search and Date Filter */}
      <Card variant="outlined">
        <CardContent className="flex items-center gap-6">
        <FormControl size="small" className="w-52">
        <TextField
            size="small"
            placeholder="Search Payment"
            variant="outlined"
            className="max-w-xs"
            />
          </FormControl>
          
          <div className="flex-grow"></div>
          <TextField
            size="small"
            type="date"
            className="w-40"
          />
          <Typography variant="body2" color="textSecondary">
            to
          </Typography>
          <TextField
            size="small"
            type="date"
            className="w-40"
          />
            <Button 
              variant="contained"
              color="primary"
            >
              Show
            </Button>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <TableContainer component={Paper} variant="outlined" className="mt-6">
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 'bold'}}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>SUPPLIER NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>NET TOTAL</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>TO PAY</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>INVOICE DATE</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index} hover>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.netTotal}</TableCell>
                <TableCell>
                  {invoice.toPay === 'Paid' ? (
                    <span className="px-3 py-1 text-sm text-white bg-green-500 rounded-full">
                      Paid
                    </span>
                  ) : (
                    invoice.toPay
                  )}
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  {invoice.toPay !== 'Paid' && (
                    <Button
                      variant="outlined"
                      color="primary"
                      className="border-amber-400 text-amber-500"
                    >
                      Pay Credit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CreditOut;