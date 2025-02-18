import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import { useState } from "react";

export default function EditDrawer({ open, onClose, item, onSave }) {
  const [formData, setFormData] = useState(item);


  React.useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 450, padding: 2 }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2>Edit Finished Good</h2>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Quantity in Stock"
          name="quantityInStock"
          type="number"
          value={formData.quantityInStock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Unit Price"
          name="unitPrice"
          type="number"
          value={formData.unitPrice}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Unique Item Number"
          name="uniqueItemNumber"
          value={formData.uniqueItemNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Drawer>
  );
}



