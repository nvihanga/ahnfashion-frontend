import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
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
import PayCreditDrawer from './PayCreditDrawer';

const CreditIn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  // Convert invoice data to include numeric values and payment method
  const [invoices, setInvoices] = useState([
    { id: '450', customer: 'customer1', netTotal: 4000.00, toPay: 0, date: '2024-12-18', paymentMethod: 'Cash', status: 'Paid' },
    { id: '3', customer: 'customer2', netTotal: 990.00, toPay: 0, date: '2024-11-29', paymentMethod: 'Cash', status: 'Paid' },
    { id: 'INV7863', customer: 'customer3', netTotal: 331.50, toPay: 331.50, date: '2024-10-26', paymentMethod: '', status: 'Unpaid' },
    { id: 'INV7786', customer: 'customer4', netTotal: 18066.75, toPay: 596.75, date: '2024-10-22', paymentMethod: 'Credit', status: 'Partial' },
    { id: 'INV95', customer: 'customer5', netTotal: 18665.36, toPay: 18665.36, date: '2024-10-22', paymentMethod: '', status: 'Unpaid' },
    { id: 'INV7780', customer: 'customer6', netTotal: 7977.25, toPay: 0, date: '2024-10-22', paymentMethod: 'Cheque', status: 'Paid' },
    { id: 'INV87', customer: 'customer7', netTotal: 4267.50, toPay: 267.50, date: '2024-10-21', paymentMethod: 'Credit', status: 'Partial' }
  ]);

  // Format currency - MOVED UP before it's used
  const formatCurrency = (value) => {
    return `Rs. ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  // Calculate summary data based on current invoices
  const calculateSummaryData = () => {
    const totalNetAmount = invoices.reduce((sum, invoice) => sum + invoice.netTotal, 0);
    const totalPaidAmount = invoices.reduce((sum, invoice) => sum + (invoice.netTotal - invoice.toPay), 0);
    const totalToPay = invoices.reduce((sum, invoice) => sum + invoice.toPay, 0);
    
    return {
      totalNetAmount: formatCurrency(totalNetAmount),
      totalPaidAmount: formatCurrency(totalPaidAmount),
      totalToPay: formatCurrency(totalToPay),
      totalInvoices: invoices.length
    };
  };

  const summaryData = calculateSummaryData();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShow = () => {
    // Filter logic would go here
    console.log("Filtering with dates:", startDate, endDate);
  };

  const handlePayCreditClick = (invoice) => {
    setSelectedInvoice({
      id: invoice.id,
      customer: invoice.customer,
      amount: invoice.toPay,
      index: invoices.findIndex(inv => inv.id === invoice.id)
    });
    setIsPaymentDrawerOpen(true);
  };

  const handlePaymentComplete = (paymentDetails) => {
    const { amount, method } = paymentDetails;
    const invoiceIndex = selectedInvoice.index;
    
    if (invoiceIndex !== -1) {
      const updatedInvoices = [...invoices];
      const invoice = updatedInvoices[invoiceIndex];
      
      // Calculate remaining amount to pay
      const remainingToPay = parseFloat((invoice.toPay - parseFloat(amount)).toFixed(2));
      
      // Update invoice status and payment method
      if (remainingToPay <= 0) {
        invoice.toPay = 0;
        invoice.status = 'Paid';
      } else {
        invoice.toPay = remainingToPay;
        invoice.status = 'Partial';
      }
      
      // Update payment method
      invoice.paymentMethod = method.charAt(0).toUpperCase() + method.slice(1);
      
      setInvoices(updatedInvoices);
    }
    
    setIsPaymentDrawerOpen(false);
  };

  const getStatusDisplay = (invoice) => {
    if (invoice.status === 'Paid') {
      return (
        <span className="px-3 py-1 text-sm text-white bg-green-500 rounded-full">
          Paid
        </span>
      );
    } else if (invoice.status === 'Partial') {
      return (
        <span className="px-3 py-1 text-sm text-white bg-yellow-500 rounded-full">
          Partial
        </span>
      );
    } else {
      return formatCurrency(invoice.toPay);
    }
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
                value={searchTerm}
                onChange={handleSearch}
                />
          </FormControl>
          
          <div className="flex-grow"></div>
          <TextField
            size="small"
            type="date"
            className="w-40"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Typography variant="body2" color="textSecondary">
            to
          </Typography>
          <TextField
            size="small"
            type="date"
            className="w-40"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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

      {/* Invoices Table */}
      <TableContainer component={Paper} variant="outlined" className="mt-6">
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 'bold'}}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>CUSTOMER NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>NET TOTAL</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>TO PAY</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>PAYMENT METHOD</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>INVOICE DATE</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index} hover>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{formatCurrency(invoice.netTotal)}</TableCell>
                <TableCell>
                  {getStatusDisplay(invoice)}
                </TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  {invoice.status !== 'Paid' && (
                    <Button
                      variant="outlined"
                      color="primary"
                      className="border-amber-400 text-amber-500"
                      onClick={() => handlePayCreditClick(invoice)}
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

      {/* Payment Drawer */}
      <PayCreditDrawer
        open={isPaymentDrawerOpen}
        onClose={() => setIsPaymentDrawerOpen(false)}
        totalAmount={selectedInvoice?.amount}
        invoiceNumber={selectedInvoice?.id}
        onPaymentComplete={handlePaymentComplete}
        allowPartialPayment={true}
      />
    </Container>
  );
};

export default CreditIn;