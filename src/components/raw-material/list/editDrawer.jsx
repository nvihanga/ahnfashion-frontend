import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { Autocomplete, FormControl, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function EditDrawer({
  open,
  onClose,
  item,
  onSave,
  supplierOptions,
  rawMaterialTypeOptions,
}) {
  const [formData, setFormData] = useState(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const selectedProductType = React.useMemo(() => {
    if (!rawMaterialTypeOptions?.length || !formData?.rawType) return null;
    return (
      rawMaterialTypeOptions.find(
        (type) => type.rawTypeId === formData.rawType
      ) || null
    );
  }, [formData?.rawType, rawMaterialTypeOptions]);

  const selectedSuppliers = React.useMemo(() => {
    if (!supplierOptions?.length || !formData?.supplierId) return [];
    return supplierOptions.filter((supplier) =>
      formData.supplierId.includes(supplier.supplierId)
    );
  }, [formData?.supplierId, supplierOptions]);

  const handleSave = () => {
    console.log("Updated Form Data:", formData);
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
          name="rawName"
          value={formData?.rawName || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth>
          <Autocomplete
            options={rawMaterialTypeOptions || []}
            getOptionLabel={(option) => option?.rawTypeName || ""}
            value={selectedProductType}
            onChange={(event, newValue) => {
              setFormData((prev) => ({
                ...prev,
                rawType: newValue ? newValue.rawTypeId : "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product Type"
                placeholder="Select Product Type"
                variant="outlined"
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body1">{option.rawTypeName}</Typography>
                </Box>
              </Box>
            )}
            isOptionEqualToValue={(option, value) =>
              option && value && option.rawTypeName === value.rawTypeName
            }
            disablePortal
            fullWidth
            margin="normal"
          />
        </FormControl>
        <TextField
          label="Quantity"
          name="rawQuantity"
          value={formData?.rawQuantity || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth>
          <Autocomplete
            multiple
            options={supplierOptions || []}
            getOptionLabel={(option) => option?.supplierName || ""}
            value={selectedSuppliers}
            onChange={(event, newValue) => {
              setFormData((prev) => ({
                ...prev,
                supplierId: newValue
                  ? newValue.map((supplier) => supplier.supplierId)
                  : [],
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Suppliers"
                placeholder="Select Suppliers"
                variant="outlined"
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body1">{option.supplierName}</Typography>
                </Box>
              </Box>
            )}
            isOptionEqualToValue={(option, value) =>
              option && value && option.supplierId === value.supplierId
            }
            disablePortal
            fullWidth
            margin="normal"
          />
        </FormControl>
        <TextField
          label="Price"
          name="rawPrice"
          value={formData?.rawPrice || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Minimum Stock Level"
          name="rawMinimumStockLevel"
          value={formData?.rawMinimumStockLevel || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Description"
          name="rawDescription"
          value={formData?.rawDescription || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
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
  setNewRawMaterial: PropTypes.func.isRequired,
  supplierOptions: PropTypes.array.isRequired,
  rawMaterialTypeOptions: PropTypes.array.isRequired,
};
