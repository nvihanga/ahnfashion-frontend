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
  Drawer,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ReceiptLong, Close, ShoppingBag } from '@mui/icons-material';

const SalesOrderList = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample customers for the dropdown
  const customers = ["Ambiga Textiles", "Chathura Enterprices", "Customer 3"];

  // Sample data - replace with your actual data
  const summaryData = {
    totalPaidAmount: 'Rs. 50,000',
    totalCreditAmount: 'Rs. 30,000',
  };

  // Sample order details data
  const orderDetailsData = {
    1: {
      orderId: 1,
      customer: 'Ambiga Textiles',
      date: '2024-02-12',
      totalAmount: 'Rs. 2,000',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      items: [
        { id: 101, name: 'Cotton Fabric', quantity: 5, unitPrice: 'Rs. 300', total: 'Rs. 1,500' },
        { id: 102, name: 'Thread Spool', quantity: 10, unitPrice: 'Rs. 50', total: 'Rs. 500' }
      ],
      address: '123 Textile Road, Colombo',
      contactNumber: '+94 77 123 4567'
    },
    2: {
      orderId: 2,
      customer: 'Chathura Enterprices',
      date: '2024-02-10',
      totalAmount: 'Rs. 4,000',
      paymentMethod: 'Credit',
      paymentStatus: 'Pending',
      items: [
        { id: 201, name: 'Silk Fabric', quantity: 2, unitPrice: 'Rs. 1,500', total: 'Rs. 3,000' },
        { id: 202, name: 'Buttons', quantity: 50, unitPrice: 'Rs. 20', total: 'Rs. 1,000' }
      ],
      address: '456 Enterprise Ave, Kandy',
      contactNumber: '+94 77 987 6543'
    }
  };

  const [salesData] = useState([
    {
      id: 1,
      customer: 'Ambiga Textiles',
      toPay: 'Rs. 2,000',
      paymentMethod: 'Cash',
      placeDate: '2024-02-12'
    },
    {
      id: 2,
      customer: 'Chathura Enterprices',
      toPay: 'Rs. 4,000',
      paymentMethod: 'Credit',
      placeDate: '2024-02-10'
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
        (row) => row.customer === selectedCustomer
      );
    }
    
    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      filteredData = filteredData.filter(
        (row) => 
          row.placeDate >= dateRange.startDate && 
          row.placeDate <= dateRange.endDate
      );
    }
    
    setFilteredSalesData(filteredData);
  };

  const handleRowClick = (orderId) => {
    setSelectedOrder(orderDetailsData[orderId]);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-20">
        {[
          { title: 'Total Paid Amount', value: summaryData.totalPaidAmount },
          { title: 'Total Credit Amount', value: summaryData.totalCreditAmount },
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
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 'bold'}}>INVOICE NUMBER</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>CUSTOMER NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>NET TOTAL</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>PAYMENT METHOD</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>INVOICE DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSalesData.map((row) => (
              <TableRow 
                key={row.id} 
                hover
                onClick={() => handleRowClick(row.id)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.toPay}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>{row.placeDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Right Drawer for Order Details */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: '40%' }
        }}
      >
        {selectedOrder && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingBag sx={{ mr: 1 }} /> Order Details
              </Typography>
              <IconButton onClick={closeDrawer} edge="end">
                <Close />
              </IconButton>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">Invoice Number</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{selectedOrder.orderId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">Date</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{selectedOrder.date}</Typography>
              </Grid>
            </Grid>

            <Typography variant="subtitle2" color="textSecondary">Customer</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{selectedOrder.customer}</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">Payment Method</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{selectedOrder.paymentMethod}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">Payment Status</Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    color: selectedOrder.paymentStatus === 'Paid' ? 'green' : 'orange'
                  }}
                >
                  {selectedOrder.paymentStatus}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="subtitle2" color="textSecondary">Total Amount</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>{selectedOrder.totalAmount}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Shipping Address</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{selectedOrder.address}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Contact Number</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{selectedOrder.contactNumber}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Order Items</Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>Item ID</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.unitPrice}</TableCell>
                      <TableCell align="right">{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Drawer>
    </div>
  );
};

export default SalesOrderList;