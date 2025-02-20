import React, { useState } from "react";
import { Drawer, TextField, Button, IconButton } from "@mui/material";
import { MdAdd, MdDelete } from "react-icons/md";
const EditDrawer = ({ open, onClose, item, onSave }) => {
  const [supplier, setSupplier] = useState({ ...item });

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };
  const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...supplier.supplierPhoneNo];
    updatedPhoneNumbers[index] = value;
    setSupplier({ ...supplier, supplierPhoneNo: updatedPhoneNumbers });
  };
  const handleAddPhoneNumber = () => {
    setSupplier({ ...supplier, supplierPhoneNo: [...supplier.supplierPhoneNo, ""] });
  };
  const handleRemovePhoneNumber = (index) => {
    const updatedPhoneNumbers = supplier.supplierPhoneNo.filter((_, i) => i !== index);
    setSupplier({ ...supplier, supplierPhoneNo: updatedPhoneNumbers });
  };

  const handleSubmit = () => {
    onSave(supplier);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
    <div className="p-4 w-80">
        <h2>Edit Supplier</h2>
        <TextField
          label="Supplier Code"
          name="supplierCode"
          value={supplier.supplierCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="supplierName"
          value={supplier.supplierName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
        label="Email"
        name="supplierEmail"
        value={supplier.supplierEmail}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <div>
          <label>Phone Numbers</label>
          {supplier.supplierPhoneNo.map((phone, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <TextField
                label={`Phone Number ${index + 1}`}
                value={phone}
                onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                fullWidth
                margin="normal"
              />
              <IconButton onClick={() => handleRemovePhoneNumber(index)} color="error">
                <MdDelete />
              </IconButton>
            </div>
          ))}
          <Button
            variant="outlined"
            startIcon={<MdAdd />}
            onClick={handleAddPhoneNumber}
            className="mt-2"
          >
            Add Phone Number
          </Button>
        </div>
        <TextField
          label="Address"
          name="supplierAddress"
          value={supplier.supplierAddress}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Notes"
          name="supplierNote"
          value={supplier.supplierNote}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
          <Button variant="contained" color="primary" onClick={handleSubmit} className="mt-4">
          Save
          </Button>
         </div>
    </Drawer>
  );
};
export default EditDrawer;



