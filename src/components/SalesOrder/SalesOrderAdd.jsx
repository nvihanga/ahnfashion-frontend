import React, { useState } from 'react';
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
  { id: 1, name: 'Customer 1'},
  { id: 2, name: 'Customer 2'},
  // Add more customers as needed
];

const SalesOrderAdd = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: '',
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
    // Perform any necessary actions before navigating (e.g., save data)

    // Navigate to another page after clicking "Publish"
     // Replace '/another-page' with the actual route path
     navigate(ROUTES.PROTECTED.SALES_ORDER.INVOICE);
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
          sx={{ width: 250}}
        />
        <Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePublish}
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
        />
        <TextField
          fullWidth
          type="date"
          variant="outlined"
          value={invoiceData.date}
          onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
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
            sx={{mb: 4 }}
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
