import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const SalesOrderInvoice = () => {
  const [orders, setOrders] = useState([
    { id: '#23534D', styleNo: '756', description: 'desc1', rate: '25.00', qty: '2', price: 'Rs. 29.74' },
    { id: '#12512B', styleNo: '756', description: 'desc1', rate: '23.06', qty: '1', price: 'Rs. 23.06' },
    { id: '#23534D', styleNo: '748', description: 'desc1', rate: '29.74', qty: '1', price: 'Rs. 29.74' },
    { id: '#76543E', styleNo: '744', description: 'desc1', rate: '23.06', qty: '1', price: 'Rs. 23.06' },
    { id: '#51323C', styleNo: '742', description: 'desc1', rate: '23.06', qty: '1', price: 'Rs. 23.06' }
  ]);

  const [formData, setFormData] = useState({
    customerName: 'John Doe',
    date: new Date().toLocaleDateString(),
    styleNo: '',
    description: '',
    qty: '',
    rate: '',
    paymentMethod: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setFormData(prev => ({
        ...prev,
        date: new Date().toLocaleDateString()
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToList = () => {
    if (!formData.qty || !formData.styleNo || !formData.description) {
      alert('Please enter quantity and style number');
      return;
    }

    const rate = (Math.random() * 30 + 20).toFixed(2);
    const quantity = parseInt(formData.qty);
    const totalPrice = (parseFloat(rate) * quantity).toFixed(2);

    const newOrder = {
      id: `#${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      styleNo: formData.styleNo,
      description: formData.description === 'desc1' ? 'Description 1' : 'Description 2',
      rate: rate,
      qty: formData.qty,
      price: `Rs. ${totalPrice}`
    };

    setOrders([newOrder, ...orders]);
    setFormData(prev => ({
      ...prev,
      styleNo: '',
      description: '',
      qty: '',
      rate: '',
      paymentMethod: ''
    }));
  };

  return (
    <div className="max-w-6xl p-8 mx-auto">
      <div className="space-y-6">
        <div className="grid items-center grid-cols-3 gap-4">
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
            <Button variant="outlined"
            color="primary" className="w-32">
              Discard
            </Button>
            <Button variant="contained" color="primary" className="w-32">
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Select
            value={formData.styleNo}
            onChange={handleInputChange}
            name="styleNo"
            displayEmpty
            className="bg-gray-50"
          >
            <MenuItem value="">Style No</MenuItem>
            <MenuItem value="1">Style 1</MenuItem>
            <MenuItem value="2">Style 2</MenuItem>
          </Select>

          <Select
            value={formData.description}
            onChange={handleInputChange}
            name="description"
            displayEmpty
            className="bg-gray-50"
          >
            <MenuItem value="">Description</MenuItem>
            <MenuItem value="desc1">Description 1</MenuItem>
            <MenuItem value="desc2">Description 2</MenuItem>
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

          <Select
            value={formData.paymentMethod}
            onChange={handleInputChange}
            name="paymentMethod"
            displayEmpty
            className="bg-gray-50"
          >
            <MenuItem value="">Payment Method</MenuItem>
            <MenuItem value="card">Card</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
          </Select>
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

        <TableContainer component={Paper} className="mt-8" sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Style No</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.styleNo}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>Rs. {order.rate}</TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{order.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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