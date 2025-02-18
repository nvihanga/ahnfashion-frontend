// PaymentDrawer.js
import React, { useState } from 'react';
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

const PaymentDrawer = ({ open, onClose, totalAmount, invoiceNumber }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amount, setAmount] = useState(totalAmount?.toString() || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [chequeDetails, setChequeDetails] = useState({
    bankName: '',
    chequeNumber: '',
    branchName: '',
    chequeDate: new Date().toISOString().split('T')[0]
  });

  const handlePaymentMethodChange = (event, newMethod) => {
    setPaymentMethod(newMethod);
  };

  const handlePayment = () => {
    // Handle payment logic here
    onClose();
  };

  const renderPaymentDetails = () => {
    const commonFields = (
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Place Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
      </Box>
    );

    if (paymentMethod === 'cheque') {
      return (
        <>
          {commonFields}
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Bank Name"
              value={chequeDetails.bankName}
              onChange={(e) => setChequeDetails({...chequeDetails, bankName: e.target.value})}
              fullWidth
            />
            <TextField
              label="Cheque Number"
              value={chequeDetails.chequeNumber}
              onChange={(e) => setChequeDetails({...chequeDetails, chequeNumber: e.target.value})}
              fullWidth
            />
            <TextField
              label="Branch Name"
              value={chequeDetails.branchName}
              onChange={(e) => setChequeDetails({...chequeDetails, branchName: e.target.value})}
              fullWidth
            />
            <TextField
                label="Cheque Date"
                type="date"
                value={chequeDetails.chequeDate}
                onChange={(e) => setChequeDetails({...chequeDetails, chequeDate: e.target.value})}
                fullWidth
                InputLabelProps={{
                    shrink: true,
          }}
        />
          </Box>
        </>
      );
    }

    return commonFields;
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
          >
            Do Payment
          </Button>
        </>
      )}
    </Drawer>
  );
};

export default PaymentDrawer;