import {
    Button,
    TextField,
  } from "@mui/material";
  import { useState } from "react";
  
  const initialSupplierState = {
    supplierCode: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    notes: "",
  };
  
  const SupplierForm = () => {
    const [supplier, setSupplier] = useState(initialSupplierState);
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSupplier((prev) => ({ ...prev, [name]: value }));
    };
  
    const validateForm = () => {
      let errors = {};
  
      if (!supplier.supplierCode) errors.supplierCode = "Supplier Code is required";
      if (!supplier.name) errors.name = "Name is required";
      if (!supplier.email) errors.email = "Email Address is required";
      if (!supplier.phoneNumber) errors.phoneNumber = "Phone Number is required";
      if (!supplier.address) errors.address = "Address is required";
      
      setErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleAddSupplier = () => {
      if (!validateForm()) return;
      console.log(supplier);
      setSupplier(initialSupplierState);
    };
  
    const handleReset = () => {
      setSupplier(initialSupplierState);
      setErrors({});
    };
  
    return (
      <div className="w-full mt-10 px-10">
        <div className="flex flex-row justify-between gap-5">
          <h1 className="font-bold">Add Supplier</h1>
          <div className="flex gap-5">
            <Button variant="contained" onClick={handleAddSupplier}>
              Submit
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
  
        <div className="mt-5">
          <TextField
            name="supplierCode"
            label="Supplier Code"
            variant="outlined"
            fullWidth
            value={supplier.supplierCode}
            onChange={handleChange}
            error={!!errors.supplierCode}
            helperText={errors.supplierCode}
          />
        </div>
  
        <div className="mt-5">
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={supplier.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </div>
  
        <div className="mt-5">
          <TextField
            name="email"
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            value={supplier.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>
  
        <div className="mt-5">
          <TextField
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            variant="outlined"
            fullWidth
            value={supplier.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
        </div>
  
        <div className="mt-5">
          <TextField
            name="address"
            label="Address"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={supplier.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
        </div>
  
        <div className="mt-5">
          <TextField
            name="notes"
            label="Notes"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={supplier.notes}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  };
  
  export default SupplierForm;
