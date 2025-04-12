import { 
  Drawer, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import { useState, useEffect } from "react";

const sizeMapping = {
  "L": "L",
  "XL": "XL",
  "2XL": "2XL",
  "3XL": "3XL",
  "4XL": "4XL",
  "5XL": "5XL"
};

const EditDrawer = ({ open, onClose, item, onSave }) => {
  const [updatedItem, setUpdatedItem] = useState(item);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setUpdatedItem(item);
  }, [item]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...updatedItem.finishedGoodVariants];
    newVariants[index][field] = Number(value);
    setUpdatedItem(prev => ({
      ...prev,
      finishedGoodVariants: newVariants
    }));
  };

  const handleSaveClick = () => {
    onSave(updatedItem);
  };

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      PaperProps={{
        sx: { width: isSmallScreen ? "100%" : 600 }
      }}
    >
      <Box p={3} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Edit Finished Good
        </Typography>

        <TextField
          label="Style Number"
          value={updatedItem?.finishId || ""}
          disabled
          fullWidth
        />

        <TextField
          label="Name"
          name="finishName"
          value={updatedItem?.finishName || ""}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Description"
          name="finishDescription"
          value={updatedItem?.finishDescription || ""}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
        />

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Variants
        </Typography>

        {updatedItem?.finishedGoodVariants?.map((variant, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Size: {sizeMapping[variant.size] || variant.size}
            </Typography>
            
            <TextField
              label="Quantity"
              value={variant.quantityInStock || 0}
              onChange={(e) => handleVariantChange(index, 'quantityInStock', e.target.value)}
              type="number"
              fullWidth
              margin="normal"
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Unit Price (Rs.)"
              value={variant.unitPrice || 0}
              onChange={(e) => handleVariantChange(index, 'unitPrice', e.target.value)}
              type="number"
              fullWidth
              margin="normal"
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Box>
        ))}

        <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
          <Button variant="outlined" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveClick}
            fullWidth
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default EditDrawer;
