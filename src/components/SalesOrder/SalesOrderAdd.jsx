import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import FinishedGoodForm from '../finished-good/add/NewItem';
import customerApi from '../../api/customerApi';
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
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

const SalesOrderAdd = () => {
  const generateInvoiceNumber = () => {
    return `INV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    date: getCurrentDate(),
    customer: null,
  });

  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  //  Fetch customers from backend
  useEffect(() => {
    customerApi.getAll()
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch customers:", error);
      });
  }, []);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 0, price: 0 }]);
    setDrawerOpen(true);
  };

  const handleCustomerChange = (event, newValue) => {
    setInvoiceData({ ...invoiceData, customer: newValue });
  };

  const handlePublish = () => {
    if (!invoiceData.customer) {
      alert('Please select a customer');
      return;
    }

    navigate(ROUTES.PROTECTED.SALES_ORDER.INVOICE, {
      state: {
        orderId: invoiceData.invoiceNumber,
        date: invoiceData.date,
        customerName: invoiceData.customer.customerName,
      }
    });
  };

  const handleDiscard = () => {
    navigate(ROUTES.PROTECTED.SALES_ORDER.LIST);
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
            Create an Invoice
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Invoice Number"
          variant="outlined"
          value={invoiceData.invoiceNumber}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          type="date"
          variant="outlined"
          value={invoiceData.date}
          InputProps={{ readOnly: true }}
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Customer</Typography>
      <Autocomplete
        options={customers}
        getOptionLabel={(option) => option.customerName || ""}
        value={invoiceData.customer}
        onChange={handleCustomerChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select Customer"
            variant="outlined"
            sx={{ mb: 6 }}
          />
        )}
      />

      <Typography variant="h6" sx={{ mb: 2 }}>Add New Finished Good</Typography>
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
  <Box sx={{ p: 3, width: "100%", maxWidth: 600 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      {/* <Typography variant="h6">Add Finished Good</Typography> */}
      <IconButton onClick={() => setDrawerOpen(false)}>
        <CloseIcon />
      </IconButton>
    </Box>
    <FinishedGoodForm onCloseDrawer={() => setDrawerOpen(false)} />
  </Box>
</Drawer>
      

      {items.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            {/* Add your TableHead and TableBody here as needed */}
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default SalesOrderAdd;