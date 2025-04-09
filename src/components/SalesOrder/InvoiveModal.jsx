import React from 'react';
import salesOrderApi from '../../api/salesOrderApi';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Divider,
  Paper,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Close as CloseIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import html2pdf from 'html2pdf.js';

const InvoiceModal = ({ open, onClose, invoiceData, orders, paymentDetails }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice-content');
    const opt = {
      margin: 1,
      filename: `Invoice-${invoiceData.orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleSendEmail = async () => {
    try {
      const response = await salesOrderApi.sendInvoice(invoiceData.orderId, {
        email: invoiceData.customerEmail,
        invoiceData,
        orders,
        paymentDetails,
      });
  
      if (response.status === 200) {
        alert("Invoice sent successfully!");
      }
    } catch (error) {
      alert("Error sending email: " + (error.response?.data?.message || error.message));
    }
  };
  

  const totalAmount = orders.reduce((sum, order) => 
    sum + parseFloat(order.price.replace('Rs. ', '')), 0).toFixed(2);

  // Get payment method specific message
  const getPaymentMessage = () => {
    switch(paymentDetails?.method) {
      case 'cash':
        return "Thank you for your cash payment. Receipt has been issued.";
      case 'cheque':
        return "Thank you for your payment by cheque. Please allow 3-5 business days for processing.";
      case 'credit':
        return "Thank you for your business! Payment is expected within 30 days.";
      default:
        return "Thank you for your business!";
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        elevation: 8,
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <ReceiptIcon />
            <Typography variant="h6" fontWeight="bold">Invoice Details</Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <div id="invoice-content" style={{ padding: '24px' }}>
          <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                  Invoice #{invoiceData.orderId}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Date:</strong> {invoiceData.date}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box textAlign={{xs: 'left', sm: 'right'}}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {invoiceData.customerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customer ID: {invoiceData.orderId.substring(4, 10)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#424242' }}>
            Order Details
          </Typography>
          
          <Paper elevation={3} sx={{ mb: 4, overflow: 'hidden', borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Style No</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rate</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      '&:nth-of-type(odd)': { bgcolor: 'rgba(0, 0, 0, 0.02)' },
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                  >
                    <TableCell>{order.styleNo}</TableCell>
                    <TableCell>{order.description}</TableCell>
                    <TableCell>{order.size}</TableCell>
                    <TableCell>{order.qty}</TableCell>
                    <TableCell>Rs. {order.rate}</TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{order.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell colSpan={4} />
                  <TableCell sx={{ fontWeight: 'bold' }}>Subtotal</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    Rs. {totalAmount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2, bgcolor: '#f8f9fa' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                  Payment Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body1" component="span" fontWeight="medium">Method:</Typography>
                  <Typography 
                    component="span" 
                    sx={{ ml: 1, 
                      color: paymentDetails?.method === 'cash' ? 'success.main' : 
                             paymentDetails?.method === 'cheque' ? 'warning.main' : 'info.main',
                      textTransform: 'capitalize'
                    }}
                  >
                    {paymentDetails?.method || 'N/A'}
                  </Typography>
                </Box>
                
                {paymentDetails?.method === 'cheque' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Bank Name:</strong> {paymentDetails.bankName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Cheque Number:</strong> {paymentDetails.chequeNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Cheque Date:</strong> {paymentDetails.chequeDate}
                    </Typography>
                  </Box>
                )}

                {paymentDetails?.method === 'credit' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Due Date:</strong> {
                        new Date(new Date(invoiceData.date).setDate(
                          new Date(invoiceData.date).getDate() + 30
                        )).toLocaleDateString()
                      }
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  bgcolor: 'white',  // Changed to white background
                  color: 'text.primary',  // Changed to normal text color
                  borderBottom: 5,  // Added border bottom for underline effect
                  borderColor: paymentDetails?.method === 'cash' ? '#2e7d32' : 
                           paymentDetails?.method === 'cheque' ? '#ed6c02' : '#1976d2',
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="medium">Total Amount</Typography>
                  <Typography 
                    variant="h4" 
                    fontWeight="bold"
                    color={paymentDetails?.method === 'cash' ? 'success.main' : 
                          paymentDetails?.method === 'cheque' ? 'warning.main' : 'primary.main'}
                  >
                    Rs. {totalAmount}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} /> 
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {getPaymentMessage()}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, bgcolor: '#f5f5f5' }}>
        <Button 
          onClick={handleDownloadPDF} 
          variant="outlined" 
          color="primary"
          startIcon={<DownloadIcon />}
        >
          Download PDF
        </Button>
        <Button 
          onClick={handleSendEmail} 
          variant="outlined" 
          color="primary"
          startIcon={<EmailIcon />}
        >
          Send Email
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="primary"
          sx={{ ml: 1 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;