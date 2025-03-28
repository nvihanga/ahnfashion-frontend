import React, { useState } from "react";
import { Drawer, TextField, Button, IconButton } from "@mui/material";
import { MdAdd, MdDelete } from "react-icons/md";

const EditDrawer = ({ open, onClose, item, onSave }) => {
  const [supplier, setSupplier] = useState({ ...item });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handlePhoneNumberChange = (index, value) => {
    if (!/^[0-9]{0,10}$/.test(value)) return;
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

  const validate = () => {
    let tempErrors = {};
    if (!supplier.supplierEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      tempErrors.supplierEmail = "Invalid email format";
    }
    supplier.supplierPhoneNo.forEach((phone, index) => {
      if (phone.length !== 10) {
        tempErrors[`supplierPhoneNo${index}`] = "Phone number must be 10 digits";
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(supplier);
    }
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
          type="email"
          value={supplier.supplierEmail}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.supplierEmail}
          helperText={errors.supplierEmail}
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
                error={!!errors[`supplierPhoneNo${index}`]}
                helperText={errors[`supplierPhoneNo${index}`]}
              />
              <IconButton onClick={() => handleRemovePhoneNumber(index)} color="error">
                <MdDelete />
              </IconButton>
            </div>
          ))}
          <Button variant="outlined" startIcon={<MdAdd />} onClick={handleAddPhoneNumber} className="mt-2">
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
