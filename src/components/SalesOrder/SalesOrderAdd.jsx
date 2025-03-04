import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes"
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Drawer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';

// Sample customer data
const customers = [
  { id: 1, name: 'Ambiga Textiles'},
  { id: 2, name: 'Chathura Enterprises'},
  // Add more customers as needed
];

const SalesOrderAdd = () => {
  // Generate invoice number function
  const generateInvoiceNumber = () => {
    return `INV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  // Get current local date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: generateInvoiceNumber(), // Automatically set invoice number
    date: getCurrentDate(), // Automatically set current date
    customer: null,
  });
  
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 0, price: 0 }]);
    setDrawerOpen(true);
  };

  const handleCustomerChange = (event, newValue) => {
    setInvoiceData({ ...invoiceData, customer: newValue });
  };

  const handlePublish = () => {
    // Validate if customer is selected
    if (!invoiceData.customer) {
      alert('Please select a customer');
      return;
    }

    // Navigate to invoice page with state data
    navigate(ROUTES.PROTECTED.SALES_ORDER.INVOICE, {
      state: {
        orderId: invoiceData.invoiceNumber,
        date: invoiceData.date,
        customerName: invoiceData.customer.name,
      }
    });
  };

  const handleDiscard = () => {
    // Reset form or navigate away
    navigate(ROUTES.PROTECTED.SALES_ORDER.LIST); // Adjust route as needed
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
        <Typography variant="h6">Invoice Info</Typography>
        
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}> 
          <Button variant="outlined" color="primary" sx={{ mr: 2 }} onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="contained" color="primary" onClick={handlePublish}>
            Publish
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Invoice Number"
          variant="outlined"
          value={invoiceData.invoiceNumber}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          type="date"
          variant="outlined"
          value={invoiceData.date}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Customer</Typography>
      <Autocomplete
        options={customers}
        getOptionLabel={(option) => option.name}
        value={invoiceData.customer}
        onChange={handleCustomerChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select Customer"
            variant="outlined"
            sx={{mb: 6 }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box>
              <Typography variant="body1">{option.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {option.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.phone}
              </Typography>
            </Box>
          </Box>
        )}
      />
      <Typography variant="h6" sx={{ mb: 2 }}>Finished good</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddItem}
        sx={{ mb: 2 }}
      >
        ADD
      </Button>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
          <Box sx={{ p: 3, width: "100%", maxWidth: 500, mx: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Add New Item</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField fullWidth label="Style Number" variant="outlined" sx={{ mb: 2, width: '90%'}} />
          <TextField fullWidth label="Name" variant="outlined" sx={{ mb: 2, width: '90%' }} />
          <TextField fullWidth type="number" label="Description" variant="outlined" multiline
  rows={4}  sx={{ mb: 2, width: '90%' }} />
          <TextField fullWidth type="number" label="Unit Price" variant="outlined" sx={{ mb: 2, width: '90%' }} />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx = {{width: '90%'}}
            onClick={() => setDrawerOpen(false)}
          >
            Add Item
          </Button>
        </Box>
        </Drawer>
        
     {items.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
  
          </Table>
        </TableContainer>
      )}

    </Container>
  );
};

export default SalesOrderAdd;