
import { Drawer, TextField, Button, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const EditDrawer = ({ open, onClose, item, onSave }) => {
  const [updatedItem, setUpdatedItem] = useState(item);

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

  const handleSaveClick = () => {
    // Ensure the price is a valid number
    if (updatedItem.finishPrice) {
      updatedItem.finishPrice = parseFloat(updatedItem.finishPrice); 
    }
    onSave(updatedItem); // Save the updated item
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={2} width={400}>
        <Typography variant="h6">Edit Finished Good</Typography>
        <TextField
          label="Style Number"
          name="finishItemNo"
          value={updatedItem?.finishItemNo || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="finishName"
          value={updatedItem?.finishName || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="finishDescription"
          value={updatedItem?.finishDescription || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="finishQuantity"
          value={updatedItem?.finishQuantity || ""}
          onChange={handleInputChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Unit Price"
          name="finishPrice"
          value={updatedItem?.finishPrice || ""} // finishPrice
          onChange={handleInputChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default EditDrawer;

