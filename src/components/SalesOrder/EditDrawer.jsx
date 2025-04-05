import React, { useState, useEffect, useRef } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Autocomplete
} from '@mui/material';

const EditDrawer = ({ 
  open, 
  onClose, 
  order, 
  styleData, 
  styleNumbers, 
  onUpdate 
}) => {
  const [editFormData, setEditFormData] = useState({
    styleNo: '',
    description: '',
    size: '',
    qty: '',
    rate: ''
  });
  const [editInputValue, setEditInputValue] = useState('');
  const [editAvailableDescriptions, setEditAvailableDescriptions] = useState([]);
  
  // Use a ref to track if we've already initialized with this order
  const initializedOrderRef = useRef(null);

  // Initialize form ONLY when drawer opens with a new order
  useEffect(() => {
    // Only initialize if order has changed or we haven't initialized yet
    if (order && (initializedOrderRef.current !== order.styleNo + order.qty + order.size)) {
      setEditFormData({
        styleNo: order.styleNo,
        description: order.description,
        size: order.size,
        qty: order.qty,
        rate: order.rate.toString()
      });
      setEditInputValue(styleData[order.styleNo]?.label || '');
      
      // Store the order identity to avoid re-initializing the same order
      initializedOrderRef.current = order.styleNo + order.qty + order.size;
    }
  }, [order, styleData, open]); // Add 'open' to dependencies to re-initialize when drawer opens

  // Reset the ref when drawer closes
  useEffect(() => {
    if (!open) {
      initializedOrderRef.current = null;
    }
  }, [open]);

  // Update available descriptions when style number changes
  useEffect(() => {
    if (editFormData.styleNo && styleData[editFormData.styleNo]) {
      setEditAvailableDescriptions(styleData[editFormData.styleNo].descriptions);
    } else {
      setEditAvailableDescriptions([]);
    }
  }, [editFormData.styleNo, styleData]);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditStyleChange = (event, newValue) => {
    setEditFormData(prev => ({
      ...prev,
      styleNo: newValue ? newValue.id : '',
      // Only reset description if changing to a different style
      description: prev.styleNo !== (newValue?.id || '') ? '' : prev.description
    }));
    setEditInputValue(newValue ? newValue.label : '');
  };

  const handleUpdateOrder = () => {
    if (!editFormData.qty || !editFormData.styleNo || !editFormData.description || !editFormData.size) {
      alert('Please fill in all required fields');
      return;
    }
    
    const quantity = parseInt(editFormData.qty);
    const rate = parseFloat(editFormData.rate).toFixed(2);
    const totalPrice = (parseFloat(rate) * quantity).toFixed(2);
    
    console.log("Updating order with:", editFormData);
    
    const updatedOrder = {
      styleNo: editFormData.styleNo,
      description: editFormData.description,
      size: editFormData.size,
      qty: editFormData.qty,
      rate: rate,
      price: `Rs. ${totalPrice}`
    };
    
    // Pass the updated order to the parent component
    onUpdate(updatedOrder);
    
    // Reset the ref to allow re-initialization for a new order
    initializedOrderRef.current = null;
  };

  const filterOptions = (options, { inputValue }) => {
    if (!inputValue) return [];
    
    const filtered = options.filter(option => 
      option.id.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aStartsWithInput = a.id.toLowerCase().startsWith(inputValue.toLowerCase());
      const bStartsWithInput = b.id.toLowerCase().startsWith(inputValue.toLowerCase());
      if (aStartsWithInput && !bStartsWithInput) return -1;
      if (!aStartsWithInput && bStartsWithInput) return 1;
      return 0;
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { 
          width: '400px',
          padding: '20px'
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Edit Order Item</Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Autocomplete
            value={styleNumbers.find(option => option.id === editFormData.styleNo) || null}
            onChange={handleEditStyleChange}
            inputValue={editInputValue}
            onInputChange={(event, newInputValue) => {
              setEditInputValue(newInputValue);
            }}
            options={styleNumbers}
            getOptionLabel={(option) => option.label}
            filterOptions={filterOptions}
            noOptionsText="No matching style numbers"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Style No"
                variant="outlined"
                className="bg-gray-50"
                placeholder="Type to search style numbers"
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            blurOnSelect
          />
          
          <Select
            value={editFormData.description}
            onChange={handleEditInputChange}
            name="description"
            displayEmpty
            disabled={!editFormData.styleNo}
            sx={{ width: '100%' }}
          >
            <MenuItem value="">Description</MenuItem>
            {editAvailableDescriptions.map((desc, index) => (
              <MenuItem key={index} value={desc}>{desc}</MenuItem>
            ))}
          </Select>
          
          <Select
            value={editFormData.size}
            onChange={handleEditInputChange}
            name="size"
            displayEmpty
            sx={{ width: '100%' }}
          >
            <MenuItem value="">Size</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
            <MenuItem value="2XL">2XL</MenuItem>
            <MenuItem value="3XL">3XL</MenuItem>
            <MenuItem value="4XL">4XL</MenuItem>
            <MenuItem value="5XL">5XL</MenuItem>
          </Select>
          
          <TextField
            label="Qty"
            variant="outlined"
            name="qty"
            type="number"
            value={editFormData.qty}
            onChange={handleEditInputChange}
            inputProps={{ min: "1" }}
          />
          
          <TextField
            label="Rate"
            variant="outlined"
            name="rate"
            type="number"
            value={editFormData.rate}
            onChange={handleEditInputChange}
            inputProps={{ min: "0", step: "0.01" }}
            InputProps={{
              startAdornment: <span>Rs. </span>,
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleUpdateOrder}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default EditDrawer;