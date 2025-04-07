import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import PaymentDrawer from "./PaymentDrawer";
import InvoiceModal from "./InvoiveModal";
import EditDrawer from "./EditDrawer";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import Notification from "./Notification";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
  FormHelperText,
  IconButton
} from '@mui/material';
import axios from 'axios';

const SalesOrderInvoice = () => {
  const navigate = useNavigate();
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const location = useLocation();

  // Edit drawer state
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // State for finished goods from backend
  const [finishedGoods, setFinishedGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDiscard = () => {
    navigate(ROUTES.PROTECTED.SALES_ORDER.ADD);
  };

  const generateOrderId = () => {
    return `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const [orders, setOrders] = useState([
    // Initial orders can be empty or with sample data
  ]);

  const [formData, setFormData] = useState({
    orderId: location.state?.orderId || generateOrderId(),
    customerName: location.state?.customerName || 'John Doe',
    date: location.state?.date || new Date().toLocaleDateString(),
    styleNo: null,
    description: '',
    qty: '',
    rate: '',
    size: ''
  });

  const [availableDescriptions, setAvailableDescriptions] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  // Fetch finished goods from backend
  useEffect(() => {
    const fetchFinishedGoods = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/v1/finishedGood/all');
        setFinishedGoods(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setNotification({
          open: true,
          message: 'Failed to fetch style data',
          severity: 'error'
        });
      }
    };

    fetchFinishedGoods();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFormData(prev => ({
        ...prev,
        date: new Date().toLocaleDateString()
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update available descriptions and sizes when style number changes
  useEffect(() => {
    if (formData.styleNo) {
      const selectedGood = finishedGoods.find(good => good.finishId === formData.styleNo);
      if (selectedGood) {
        setAvailableDescriptions([selectedGood.finishDescription]);
        setAvailableSizes(selectedGood.finishedGoodVariants.map(variant => variant.size));
        
        // Auto-select the description if there's only one
        if (selectedGood.finishDescription) {
          setFormData(prev => ({
            ...prev,
            description: selectedGood.finishDescription
          }));
        }
      } else {
        setAvailableDescriptions([]);
        setAvailableSizes([]);
      }
    } else {
      setAvailableDescriptions([]);
      setAvailableSizes([]);
    }
  }, [formData.styleNo, finishedGoods]);

  const handleEditClick = (order, index) => {
    setEditingOrder({ ...order, index });
    setIsEditDrawerOpen(true);
  };
  
  const handleDeleteClick = (order, index) => {
    setOrderToDelete({ ...order, index });
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (orderToDelete !== null) {
      const newOrders = [...orders];
      newOrders.splice(orderToDelete.index, 1);
      setOrders(newOrders);
      
      setNotification({
        open: true,
        message: 'Item deleted successfully',
        severity: 'success'
      });
    }
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };
  
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };
  
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };
  
  const handleUpdateOrder = (updatedOrder) => {
    if (!editingOrder || editingOrder.index === undefined) {
      console.error("No order to update or missing index");
      return;
    }
    
    const newOrders = [...orders];
    newOrders[editingOrder.index] = updatedOrder;
    setOrders(newOrders);
    
    setNotification({
      open: true,
      message: 'Item updated successfully',
      severity: 'success'
    });
    
    setIsEditDrawerOpen(false);
    setEditingOrder(null);
  };

  const handlePublish = () => {
    if (paymentDetails) {
      setIsInvoiceModalOpen(true);
    } else {
      alert('Please complete the payment first');
    }
  };

  const handlePaymentComplete = (details) => {
    setPaymentDetails(details);
    setIsPaymentDrawerOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStyleChange = (event, newValue) => {
    setFormData({
      ...formData,
      styleNo: newValue ? newValue.id : '',
      description: '',
      size: ''
    });
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

  const handleAddToList = () => {
    if (!formData.qty || !formData.styleNo || !formData.description || !formData.size) {
      alert('Please fill in all required fields');
      return;
    }

    // Find the selected finished good to get the price
    const selectedGood = finishedGoods.find(good => good.finishId === formData.styleNo);
    if (!selectedGood) {
      alert('Selected style not found');
      return;
    }

    // Find the selected variant to get the exact price
    const selectedVariant = selectedGood.finishedGoodVariants.find(
      variant => variant.size === formData.size
    );
    if (!selectedVariant) {
      alert('Selected size not found for this style');
      return;
    }

    const rate = selectedVariant.unitPrice;
    const quantity = parseInt(formData.qty);
    const totalPrice = (parseFloat(rate) * quantity).toFixed(2);

    const newOrder = {
      styleNo: formData.styleNo,
      description: formData.description,
      size: formData.size,
      qty: formData.qty,
      rate: rate.toFixed(2),
      price: `Rs. ${totalPrice}`
    };

    setOrders([newOrder, ...orders]);
    setFormData(prev => ({
      ...prev,
      styleNo: null,
      description: '',
      qty: '',
      rate: '',
      size: ''
    }));
    setInputValue('');
  };

  // Convert finished goods to format needed for Autocomplete
  const styleNumbers = finishedGoods.map(good => ({
    id: good.finishId,
    label: `Style ${good.finishId} - ${good.finishName}`
  }));

  if (loading) {
    return <div>Loading styles...</div>;
  }

  if (error) {
    return <div>Error loading styles: {error}</div>;
  }

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <div className="space-y-6">
        <div className="grid items-center grid-cols-4 gap-4">
          <TextField
            label="Invoice Number"
            variant="outlined"
            value={formData.orderId}
            className="bg-gray-50"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Customer name"
            variant="outlined"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="bg-gray-50"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Date"
            variant="outlined"
            value={formData.date}
            className="bg-gray-50"
            InputProps={{
              readOnly: true,
            }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outlined" color="primary" className="w-32" onClick={handleDiscard}>
              Discard
            </Button>
            <Button variant="contained" color="primary" className="w-32" onClick={handlePublish}>
              Create
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Autocomplete
            value={styleNumbers.find(option => option.id === formData.styleNo) || null}
            onChange={handleStyleChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              setOpen(!!newInputValue);
            }}
            open={open}
            onClose={() => setOpen(false)}
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
            openOnFocus={false}
            ListboxProps={{
              style: { maxHeight: '200px' }
            }}
          />

          <div>
            <Select
              value={formData.description}
              onChange={handleInputChange}
              name="description"
              displayEmpty
              className="w-full bg-gray-50"
              disabled={!formData.styleNo}
            >
              <MenuItem value="">Description</MenuItem>
              {availableDescriptions.map((desc, index) => (
                <MenuItem key={index} value={desc}>{desc}</MenuItem>
              ))}
            </Select>
            {!formData.styleNo && (
              <FormHelperText>Select a style number first</FormHelperText>
            )}
          </div>

          <Select
            value={formData.size}
            onChange={handleInputChange}
            name="size"
            displayEmpty
            className="bg-gray-50"
            disabled={!formData.styleNo}
          >
            <MenuItem value="">Size</MenuItem>
            {availableSizes.map((size, index) => (
              <MenuItem key={index} value={size}>{size}</MenuItem>
            ))}
          </Select>

          <TextField
            label="Qty"
            variant="outlined"
            name="qty"
            type="number"
            value={formData.qty}
            onChange={handleInputChange}
            className="bg-gray-50"
            inputProps={{ min: "1" }}
          />
        </div>

        <div className="flex justify-end">
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleAddToList}
            className="w-32"
          >
            Add to list
          </Button>
        </div>

        <TableContainer component={Paper} variant="outlined" className="mt-8" sx={{ maxHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: 'bold'}}>STYLE NO</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>DESCRIPTION</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>SIZE</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>QTY</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>RATE</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>PRICE</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.styleNo}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{order.size}</TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>Rs. {order.rate}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    <IconButton
                      color="info"
                      id="edit"
                      onClick={() => handleEditClick(order, index)}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      id="delete"
                      onClick={() => handleDeleteClick(order, index)}
                    >
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            variant="contained"
            onClick={() => setIsPaymentDrawerOpen(true)}
          >
            Pay
          </Button>
        </Box>

        <PaymentDrawer
          open={isPaymentDrawerOpen}
          onClose={() => setIsPaymentDrawerOpen(false)}
          onPaymentComplete={handlePaymentComplete}
          totalAmount={orders.reduce((sum, order) => 
            sum + parseFloat(order.price.replace('Rs. ', '')), 0).toFixed(2)}
          invoiceNumber={formData.orderId}
        />

        <InvoiceModal
          open={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          invoiceData={formData}
          orders={orders}
          paymentDetails={paymentDetails}
        />

        <EditDrawer
          open={isEditDrawerOpen}
          onClose={() => setIsEditDrawerOpen(false)}
          order={editingOrder}
          finishedGoods={finishedGoods}
          styleNumbers={styleNumbers}
          onUpdate={handleUpdateOrder}
        />
        
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={handleCancelDelete}
          order={orderToDelete}
          onConfirm={handleConfirmDelete}
        />
        
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />

        <div className="flex items-center justify-between p-4 mt-6 text-2xl bg-gray-100 rounded-lg">
          <div className="font-semibold">Total Amount</div>
          <div className="font-semibold text-blue-600">
            Rs. {orders.reduce((sum, order) => sum + parseFloat(order.price.replace('Rs. ', '')), 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderInvoice;