import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

const productTypes = [
  { id: 1, name: "Buttons" },
  { id: 2, name: "Threads" },
  { id: 3, name: "Fabrics" },
  { id: 4, name: "Labels" },
];

const suppliers = [
  { id: 1, name: "Naturub Industries (Pvt) Ltd" },
  { id: 2, name: "CIB Accessories" },
  { id: 3, name: "Chathura Enterprices" },
  { id: 4, name: "Sanko Texttiles" },
];

export default function EditDrawer({
  open,
  onClose,
  item,
  onSave,
  newRawMaterial,
  setNewRawMaterial,
}) {
  const [formData, setFormData] = useState(item);

  React.useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const updatedRawMaterials = newRawMaterial.map((material) =>
      material.id === formData.id ? formData : material
    );
    setNewRawMaterial(updatedRawMaterials);
    onSave(formData);
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 450, padding: 2 }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2>Edit Item</h2>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>
        <TextField
          label="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth>
          <InputLabel id="Product_Type">Product Type</InputLabel>
          <Select
            label="Product_Type"
            name="productType"
            value={formData.type}
            onChange={handleChange}
          >
            {productTypes.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth>
          <InputLabel id="Product_Type">Supplier</InputLabel>
          <Select
            label="Supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
          >
            {suppliers.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Price"
          name="price"
          value={formData.price}
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

EditDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  newRawMaterial: PropTypes.object,
  setNewRawMaterial: PropTypes.func,
};
