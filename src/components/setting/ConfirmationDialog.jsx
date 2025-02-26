import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button,
  Box,
  Typography,
  Divider,
  useTheme
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
  const theme = useTheme();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          width: '450px',
          maxWidth: '95vw',
          borderRadius: '8px'
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1.5}>
          <WarningAmberRoundedIcon 
            fontSize="medium" 
            sx={{ color: theme.palette.warning.main }} 
          />
          <Typography variant="h6" component="span">
            {title || "Confirm Action"}
          </Typography>
        </Box>
      </DialogTitle>
      
      <Divider />

      <DialogContent>
        <DialogContentText sx={{ color: 'text.primary', lineHeight: 1.5 }}>
          <Typography variant="body1" fontWeight={500} mb={1}>
            {message || "Are you sure you want to perform this action?"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone.
          </Typography>
        </DialogContentText>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: 'text.primary',
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover',
              borderColor: 'divider'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: 'error.dark'
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;