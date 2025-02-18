import React from 'react';
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
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import html2pdf from 'html2pdf.js';

const InvoiceModal = ({ open, onClose, invoiceData, orders, paymentDetails }) => {
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
      // Replace with your actual API endpoint
      const response = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: invoiceData.customerEmail,
          invoiceData,
          orders,
          paymentDetails
        }),
      });

      if (response.ok) {
        alert('Invoice sent successfully!');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      alert('Error sending email: ' + error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Invoice Details</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <div id="invoice-content">
          <Box mb={3}>
            <Typography variant="h5" gutterBottom>Invoice #{invoiceData.orderId}</Typography>
            <Typography>Date: {invoiceData.date}</Typography>
            <Typography>Customer Name: {invoiceData.customerName}</Typography>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Style No</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Price</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box mt={3}>
            <Typography variant="h6">Payment Details</Typography>
            <Typography>Method: {paymentDetails?.method}</Typography>
            {paymentDetails?.method === 'cheque' && (
              <>
                <Typography>Bank Name: {paymentDetails.bankName}</Typography>
                <Typography>Cheque Number: {paymentDetails.chequeNumber}</Typography>
                <Typography>Cheque Date: {paymentDetails.chequeDate}</Typography>
              </>
            )}
            <Typography variant="h6" mt={2}>
              Total Amount: Rs. {orders.reduce((sum, order) => sum + parseFloat(order.price.replace('Rs. ', '')), 0).toFixed(2)}
            </Typography>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDownloadPDF} variant="outlined" color="primary">
          Download PDF
        </Button>
        <Button onClick={handleSendEmail} variant="outlined" color="primary">
          Send Email
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;