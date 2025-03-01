import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Card,
  CardContent,
  Typography,
  FormControl,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { 
  AccessTime, 
  ErrorOutline, 
  CheckCircleOutline,
  ListAlt
} from '@mui/icons-material';

const ChequeIn = () => {
  // Sample data
  const [cheques, setCheques] = useState([
    { id: '901134', amount: 15116.40, status: 'pending', reason: 'INV7341 direct cheque payment', placeDate: '2024-09-25', chequeDate: '2024-10-16' },
    { id: '013740', amount: 7610.13, status: 'pending', reason: 'INV7454 direct cheque payment', placeDate: '2024-10-04', chequeDate: '2024-10-18' },
    { id: '103116', amount: 10562.10, status: 'pending', reason: 'INV6873 Credit cheque payment', placeDate: '2024-10-10', chequeDate: '2024-10-20' },
    { id: '956500', amount: 16213.75, status: 'pending', reason: 'INV7299 Credit cheque payment', placeDate: '2024-09-27', chequeDate: '2024-10-21' },
    { id: '776555', amount: 7594.54, status: 'pending', reason: 'INV54 Credit cheque payment', placeDate: '2024-10-21', chequeDate: '2024-10-21' },
    { id: '353808', amount: 9593.10, status: 'pending', reason: 'INV7371 direct cheque payment', placeDate: '2024-10-09', chequeDate: '2024-10-23' },
  ]);

  // State for notification
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // State for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    chequeId: null,
    action: null
  });

  // State for summary data
  const calculateSummary = () => {
    const pendingCheques = cheques.filter(c => c.status === 'pending');
    const declinedCheques = cheques.filter(c => c.status === 'declined');
    const clearedCheques = cheques.filter(c => c.status === 'cleared');
    
    const pendingTotal = pendingCheques.reduce((sum, c) => sum + c.amount, 0);
    const declinedTotal = declinedCheques.reduce((sum, c) => sum + c.amount, 0);
    const clearedTotal = clearedCheques.reduce((sum, c) => sum + c.amount, 0) + 9970.50;
    
    return {
      pending: {
        total: pendingTotal.toFixed(2),
        count: pendingCheques.length
      },
      declined: {
        total: declinedTotal.toFixed(2),
        count: declinedCheques.length
      },
      cleared: {
        total: clearedTotal.toFixed(2),
        count: clearedCheques.length + 10
      },
      total: {
        total: (pendingTotal + clearedTotal).toFixed(2),
        count: pendingCheques.length + clearedCheques.length + 10
      }
    };
  };

  const summary = calculateSummary();

  // Handle close notification
  const handleCloseNotification = () => {
    setNotification({...notification, open: false});
  };

  // Show confirmation dialog before action
  const showConfirmDialog = (id, action) => {
    const cheque = cheques.find(c => c.id === id);
    setConfirmDialog({
      open: true,
      title: action === 'clear' ? 'Clear Cheque' : 'Decline Cheque',
      message: `Are you sure you want to ${action} cheque #${id} for Rs. ${cheque.amount.toFixed(2)}?`,
      chequeId: id,
      action: action
    });
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setConfirmDialog({...confirmDialog, open: false});
  };

  // Handle confirmation
  const handleConfirm = () => {
    const { chequeId, action } = confirmDialog;
    performAction(chequeId, action);
    handleCloseDialog();
  };

  // Perform the actual action
  const performAction = (id, action) => {
    setCheques(cheques.map(cheque => 
      cheque.id === id 
        ? {...cheque, status: action === 'clear' ? 'cleared' : 'declined'} 
        : cheque
    ));

    // Show notification
    setNotification({
      open: true,
      message: `Cheque #${id} has been ${action === 'clear' ? 'cleared' : 'declined'} successfully`,
      severity: action === 'clear' ? 'success' : 'warning'
    });
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="flex items-start justify-between">
            <div>
              <Typography variant="subtitle1" className="text-gray-600">Pending cheques</Typography>
              <Typography variant="h5" component="div" className="font-bold">
                Rs. {summary.pending.total}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {summary.pending.count} cheques
              </Typography>
            </div>
            <Box className="p-2 bg-gray-100 rounded-full">
              <AccessTime className="text-gray-700" />
            </Box>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-start justify-between">
            <div>
              <Typography variant="subtitle1" className="text-gray-600">Declined cheques</Typography>
              <Typography variant="h5" component="div" className="font-bold">
                Rs. {summary.declined.total}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {summary.declined.count} cheques
              </Typography>
            </div>
            <Box className="p-2 bg-gray-100 rounded-full">
              <ErrorOutline className="text-gray-700" />
            </Box>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-start justify-between">
            <div>
              <Typography variant="subtitle1" className="text-gray-600">Cleared cheques</Typography>
              <Typography variant="h5" component="div" className="font-bold">
                Rs. {summary.cleared.total}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {summary.cleared.count} cheques
              </Typography>
            </div>
            <Box className="p-2 bg-gray-100 rounded-full">
              <CheckCircleOutline className="text-gray-700" />
            </Box>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-start justify-between">
            <div>
              <Typography variant="subtitle1" className="text-gray-600">Total (without declined)</Typography>
              <Typography variant="h5" component="div" className="font-bold">
                Rs. {summary.total.total}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {summary.total.count} cheques
              </Typography>
            </div>
            <Box className="p-2 bg-gray-100 rounded-full">
              <ListAlt className="text-gray-700" />
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card variant="outlined">
        <CardContent className="flex items-center gap-6">
        <FormControl size="small" className="w-52">
        <TextField
            size="small"
            placeholder="Search Payment"
            variant="outlined"
            className="max-w-xs"
            />
          </FormControl>
          
          <div className="flex-grow"></div>
          <TextField
            size="small"
            type="date"
            className="w-40"
          />
          <Typography variant="body2" color="textSecondary">
            to
          </Typography>
          <TextField
            size="small"
            type="date"
            className="w-40"
          />
            <Button 
              variant="contained"
              color="primary"
            >
              Show
            </Button>
        </CardContent>
      </Card>
      {/* Cheques Table */}
      
      <TableContainer component={Paper} variant="outlined" className="mt-6 shadow-sm">
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 'bold'}}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>AMOUNT</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>REASON</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>PLACE DATE</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>CHEQUE DATE</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}} align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cheques.map((cheque) => (
              <TableRow key={cheque.id} hover>
                <TableCell>{cheque.id}</TableCell>
                <TableCell>Rs. {cheque.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={
                    cheque.status === 'pending' 
                      ? 'text-blue-500' 
                      : cheque.status === 'cleared' 
                        ? 'text-green-500' 
                        : 'text-red-500'
                  }>
                    {cheque.status}
                  </span>
                </TableCell>
                <TableCell>{cheque.reason}</TableCell>
                <TableCell>{cheque.placeDate}</TableCell>
                <TableCell>{cheque.chequeDate}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    {cheque.status === 'pending' && (
                      <>
                        <Button 
                          variant="contained" 
                          color="success"
                          sx={{ 
                            backgroundColor: '#22c55e', 
                            '&:hover': {
                              backgroundColor: '#16a34a' 
                            }
                          }}
                          size="small"
                          onClick={() => showConfirmDialog(cheque.id, 'clear')}
                        >
                          Clear
                        </Button>
                        <Button 
                          variant="outlined" 
                          color="error"
                          sx={{ 
                            color: '#ef4444', 
                            borderColor: '#ef4444', 
                            '&:hover': {
                              backgroundColor: '#fef2f2', 
                              borderColor: '#ef4444',
                            }
                          }}
                          size="small"
                          onClick={() => showConfirmDialog(cheque.id, 'decline')}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                    {cheque.status !== 'pending' && (
                      <Typography variant="body2" color="textSecondary">
                        No actions available
                      </Typography>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            color={confirmDialog.action === 'clear' ? 'success' : 'error'} 
            variant="contained" 
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChequeIn;