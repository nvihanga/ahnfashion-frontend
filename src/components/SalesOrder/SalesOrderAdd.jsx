import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

// Sample customer data
const customers = [
  { id: 1, name: 'Customer 1', email: 'Customer1@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Customer 2', email: 'Customer2@example.com', phone: '234-567-8901' },
  // Add more customers as needed
];

const SalesOrderAdd = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: '',
    customer: null,
  });
  
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 0, price: 0 }]);
  };

  const handleCustomerChange = (event, newValue) => {
    setInvoiceData({ ...invoiceData, customer: newValue });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon color="action" />,
          }}
          sx={{ width: 250, bgcolor: 'grey.100' }}
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            color="primary"
          >
            Publish
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Invoice Info</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Invoice Number"
          variant="outlined"
          value={invoiceData.invoiceNumber}
          onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
          sx={{ bgcolor: 'grey.100' }}
        />
        <TextField
          fullWidth
          type="date"
          variant="outlined"
          value={invoiceData.date}
          onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
          sx={{ bgcolor: 'grey.100' }}
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
            sx={{ bgcolor: 'grey.100', mb: 4 }}
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
        
     {items.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
          {/*  <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
     */}
         {/*<TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Item name"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      placeholder="0.00"
                    />
                  </TableCell>
                  <TableCell>₹0.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
           */}
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default SalesOrderAdd;