import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import PaymentDrawer from "./PaymentDrawer";
import InvoiceModal from "./InvoiveModal";
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

const SalesOrderInvoice = () => {
  // Sample style numbers with their related descriptions
  const styleData = {
    '756': {
      label: 'Style 756',
      descriptions: ['Sleeveless', 'Short Sleeve']
    },
    '748': {
      label: 'Style 748',
      descriptions: ['Zipper Front', 'Button Front']
    },
    '742': {
      label: 'Style 742',
      descriptions: ['V-Neck', 'Crew Neck']
    },
    '744': {
      label: 'Style 744',
      descriptions: ['Polo', 'Henley']
    },
    '738': {
      label: 'Style 738',
      descriptions: ['Cardigan', 'Pullover']
    },
    '760': {
      label: 'Style 760',
      descriptions: ['Tank Top', 'Muscle Tee']
    },
  };
  
  // Convert to array for Autocomplete
  const styleNumbers = Object.entries(styleData).map(([id, data]) => ({
    id,
    label: data.label
  }));
  
  const navigate = useNavigate();
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const location = useLocation();

  const handleDiscard = () => {
    navigate(ROUTES.PROTECTED.SALES_ORDER.ADD);
  };

  const generateOrderId = () => {
    return `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const [orders, setOrders] = useState([
    { styleNo: '756', description: 'Sleeveless', size: 'L', qty: '2', rate: '25.00', price: 'Rs. 50.00' },
    { styleNo: '756', description: 'Short Sleeve', size: 'XL', qty: '1', rate: '23.06', price: 'Rs. 23.06' },
    { styleNo: '748', description: 'Zipper Front', size: 'M', qty: '1', rate: '29.74', price: 'Rs. 29.74' }
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
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFormData(prev => ({
        ...prev,
        date: new Date().toLocaleDateString()
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update available descriptions when style number changes
  useEffect(() => {
    if (formData.styleNo && styleData[formData.styleNo]) {
      setAvailableDescriptions(styleData[formData.styleNo].descriptions);
      // Reset description when style changes
      setFormData(prev => ({...prev, description: ''}));
    } else {
      setAvailableDescriptions([]);
    }
  }, [formData.styleNo]);

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
      description: '' // Reset description when style changes
    });
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

  const handleAddToList = () => {
    if (!formData.qty || !formData.styleNo || !formData.description || !formData.size) {
      alert('Please fill in all required fields');
      return;
    }

    const rate = (Math.random() * 30 + 20).toFixed(2);
    const quantity = parseInt(formData.qty);
    const totalPrice = (parseFloat(rate) * quantity).toFixed(2);

    const newOrder = {
      styleNo: formData.styleNo,
      description: formData.description,
      size: formData.size,
      qty: formData.qty,
      rate: rate,
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
              Publish
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
                    onClick={() => handleEditClick(raw)}
                  >
                    <MdEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    id="delete"
                    onClick={() => handleDeleteClick(raw)}
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