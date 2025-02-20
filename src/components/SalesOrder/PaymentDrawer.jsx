import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Typography,
  Button,
  TextField,
  IconButton,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PaymentDrawer = ({ open, onClose, totalAmount, invoiceNumber, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amount, setAmount] = useState(totalAmount?.toString() || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [chequeDetails, setChequeDetails] = useState({
    bankName: '',
    chequeNumber: '',
    branchName: '',
    chequeDate: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setAmount(totalAmount?.toString() || '');
  }, [totalAmount]);

  useEffect(() => {
    if (open) {
      setAmount(totalAmount?.toString() || '');
      setPaymentMethod(null);
      setErrors({});
      setChequeDetails({
        bankName: '',
        chequeNumber: '',
        branchName: '',
        chequeDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [open, totalAmount]);

  const validatePayment = () => {
    const newErrors = {};
    
    if (!amount || parseFloat(amount) !== parseFloat(totalAmount)) {
      newErrors.amount = 'Amount must match the total amount';
    }
    
    if (paymentMethod === 'cheque') {
      if (!chequeDetails.bankName) newErrors.bankName = 'Bank name is required';
      if (!chequeDetails.chequeNumber) newErrors.chequeNumber = 'Cheque number is required';
      if (!chequeDetails.branchName) newErrors.branchName = 'Branch name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentMethodChange = (event, newMethod) => {
    setPaymentMethod(newMethod);
    setErrors({});
  };

  const handlePayment = () => {
    if (!validatePayment()) {
      return;
    }

    const paymentDetails = {
      method: paymentMethod,
      date: date,
      amount: amount,
      ...(paymentMethod === 'cheque' ? chequeDetails : {})
    };

    onPaymentComplete(paymentDetails);
    onClose();
  };

  // Add the missing renderPaymentDetails function
  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'cash':
      case 'credit':
        return (
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={!!errors.amount}
            helperText={errors.amount}
            sx={{ mb: 2 }}
          />
        );
      case 'cheque':
        return (
          <>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={!!errors.amount}
              helperText={errors.amount}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Bank Name"
              value={chequeDetails.bankName}
              onChange={(e) => setChequeDetails({ ...chequeDetails, bankName: e.target.value })}
              error={!!errors.bankName}
              helperText={errors.bankName}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Cheque Number"
              value={chequeDetails.chequeNumber}
              onChange={(e) => setChequeDetails({ ...chequeDetails, chequeNumber: e.target.value })}
              error={!!errors.chequeNumber}
              helperText={errors.chequeNumber}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Branch Name"
              value={chequeDetails.branchName}
              onChange={(e) => setChequeDetails({ ...chequeDetails, branchName: e.target.value })}
              error={!!errors.branchName}
              helperText={errors.branchName}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label="Cheque Date"
              value={chequeDetails.chequeDate}
              onChange={(e) => setChequeDetails({ ...chequeDetails, chequeDate: e.target.value })}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 500 }, p: 3 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Payment Method</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Select Payment Method
      </Typography>

      <ToggleButtonGroup
        value={paymentMethod}
        exclusive
        onChange={handlePaymentMethodChange}
        fullWidth
        sx={{ mb: 3 }}
      >
        <ToggleButton value="cash" sx={{ py: 1.5 }}>
          Cash
        </ToggleButton>
        <ToggleButton value="credit" sx={{ py: 1.5 }}>
          Credit
        </ToggleButton>
        <ToggleButton value="cheque" sx={{ py: 1.5 }}>
          Cheque
        </ToggleButton>
      </ToggleButtonGroup>

      {paymentMethod && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">
              Pay <Box component="span" sx={{ color: 'primary.main' }}>Rs. {totalAmount}</Box>{' '}
              via {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              for invoice {invoiceNumber}
            </Typography>
          </Box>

          {renderPaymentDetails()}

          <Button
            variant="contained"
            fullWidth
            onClick={handlePayment}
            sx={{ mt: 4 }}
            disabled={!paymentMethod || !amount}
          >
            Do Payment
          </Button>
        </>
      )}
    </Drawer>
  );
};

export default PaymentDrawer;