

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
  finishedGoods, // Updated prop name
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
  const [editAvailableSizes, setEditAvailableSizes] = useState([]);
  
  const initializedOrderRef = useRef(null);

  // Initialize form when drawer opens with a valid order
  useEffect(() => {
    if (!order || !open) return; // Exit if no order or drawer is closed

    if (initializedOrderRef.current !== `${order.styleNo}${order.qty}${order.size}`) {
      setEditFormData({
        styleNo: order.styleNo || '',
        description: order.description || '',
        size: order.size || '',
        qty: order.qty || '',
        rate: order.rate ? order.rate.toString() : ''
      });

      // Find the selected finished good
      const selectedGood = finishedGoods.find(good => good.finishId === order.styleNo);
      if (selectedGood) {
        setEditInputValue(`Style ${selectedGood.finishId} - ${selectedGood.finishName}`);
        setEditAvailableDescriptions([selectedGood.finishDescription]);
        setEditAvailableSizes(selectedGood.finishedGoodVariants.map(variant => variant.size));
      }

      initializedOrderRef.current = `${order.styleNo}${order.qty}${order.size}`;
    }
  }, [order, finishedGoods, open]);

  // Reset ref when drawer closes
  useEffect(() => {
    if (!open) {
      initializedOrderRef.current = null;
      setEditFormData({
        styleNo: '',
        description: '',
        size: '',
        qty: '',
        rate: ''
      });
      setEditInputValue('');
      setEditAvailableDescriptions([]);
      setEditAvailableSizes([]);
    }
  }, [open]);

  // Update descriptions and sizes when style number changes
  useEffect(() => {
    if (editFormData.styleNo) {
      const selectedGood = finishedGoods.find(good => good.finishId === editFormData.styleNo);
      if (selectedGood) {
        setEditAvailableDescriptions([selectedGood.finishDescription]);
        setEditAvailableSizes(selectedGood.finishedGoodVariants.map(variant => variant.size));
      } else {
        setEditAvailableDescriptions([]);
        setEditAvailableSizes([]);
      }
    }
  }, [editFormData.styleNo, finishedGoods]);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditStyleChange = (event, newValue) => {
    const newStyleNo = newValue ? newValue.id : '';
    setEditFormData(prev => ({
      ...prev,
      styleNo: newStyleNo,
      description: prev.styleNo !== newStyleNo ? '' : prev.description,
      size: prev.styleNo !== newStyleNo ? '' : prev.size
    }));
    setEditInputValue(newValue ? newValue.label : '');
  };

  const handleUpdateOrder = () => {
    if (!editFormData.qty || !editFormData.styleNo || !editFormData.description || !editFormData.size) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedGood = finishedGoods.find(good => good.finishId === editFormData.styleNo);
    if (!selectedGood) {
      alert('Selected style not found');
      return;
    }

    const selectedVariant = selectedGood.finishedGoodVariants.find(
      variant => variant.size === editFormData.size
    );
    if (!selectedVariant) {
      alert('Selected size not found for this style');
      return;
    }

    const quantity = parseInt(editFormData.qty);
    const rate = parseFloat(selectedVariant.unitPrice).toFixed(2);
    const totalPrice = (parseFloat(rate) * quantity).toFixed(2);

    const updatedOrder = {
      styleNo: editFormData.styleNo,
      description: editFormData.description,
      size: editFormData.size,
      qty: editFormData.qty,
      rate: rate,
      price: `Rs. ${totalPrice}`
    };

    onUpdate(updatedOrder);
    initializedOrderRef.current = null;
  };

  const filterOptions = (options, { inputValue }) => {
    if (!inputValue) return [];
    
    const filtered = options.filter(option => 
      option.id.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aStartsWithInput = a.id.toString().toLowerCase().startsWith(inputValue.toLowerCase());
      const bStartsWithInput = b.id.toString().toLowerCase().startsWith(inputValue.toLowerCase());
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
            disabled={!editFormData.styleNo}
            sx={{ width: '100%' }}
          >
            <MenuItem value="">Size</MenuItem>
            {editAvailableSizes.map((size, index) => (
              <MenuItem key={index} value={size}>{size}</MenuItem>
            ))}
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
            disabled // Rate is now fetched from backend
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

//update