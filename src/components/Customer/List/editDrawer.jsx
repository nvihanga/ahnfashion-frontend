import React, { useState } from "react";
import { Drawer, TextField, Button, IconButton } from "@mui/material";
import { MdAdd, MdDelete } from "react-icons/md";

const EditDrawerCustomer = ({ open, onClose, item, onSave }) => {
  const [customer, setCustomer] = useState({
    ...item,
    phoneNumbers: item.phoneNumbers || [""]
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...customer.phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
  };

  const handleAddPhoneNumber = () => {
    setCustomer({ ...customer, phoneNumbers: [...customer.phoneNumbers, ""] });
  };

  const handleRemovePhoneNumber = (index) => {
    const updatedPhoneNumbers = customer.phoneNumbers.filter((_, i) => i !== index);
    setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
  };

  const handleSubmit = () => {
    onSave(customer);
  };

  return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <div className="p-4 w-80">
          <h2>Edit Customer</h2>
          <TextField
              label="Customer Code"
              name="customerCode"
              value={customer.customerCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
          />
          <TextField
              label="Name"
              name="customerName"
              value={customer.customerName}
              onChange={handleChange}
              fullWidth
              margin="normal"
          />
          <TextField
              label="Email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
          />
          <div>
            <label>Phone Numbers</label>
            {customer.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <TextField
                      label={`Phone ${index + 1}`}
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
              Add Phone
            </Button>
          </div>
          <TextField
              label="Address"
              name="address"
              value={customer.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
          />
          <TextField
              label="Notes"
              name="notes"
              value={customer.notes}
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

export default EditDrawerCustomer;