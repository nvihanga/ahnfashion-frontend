import { Button, TextField, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const initialSupplierState = {
  supplierCode: "",
  name: "",
  email: "",
  phoneNumbers: [""],
  address: "",
  notes: "",
};
const SupplierForm = () => {
  const [supplier, setSupplier] = useState(initialSupplierState);
  const [errors, setErrors] = useState({});
  const [editingSupplierId, setEditingSupplierId] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };
  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...supplier.phoneNumbers];
    updatedPhones[index] = value;
    setSupplier((prev) => ({ ...prev, phoneNumbers: updatedPhones }));
  };
  const addPhoneNumber = () => {
    setSupplier((prev) => ({ ...prev, phoneNumbers: [...prev.phoneNumbers, ""] }));
  };
 const addPhoneNumber = () => {
    setSupplier((prev) => ({ ...prev, phoneNumbers: [...prev.phoneNumbers, ""] }));
  };
  const removePhoneNumber = (index) => {
    setSupplier((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
    }));
  };
  const validateForm = () => {
    let errors = {};
    if (!supplier.supplierCode) errors.supplierCode = "Supplier Code is required";
    if (!supplier.name) errors.name = "Name is required";
    if (!supplier.email) errors.email = "Email Address is required";
    if (supplier.phoneNumbers.some((phone) => !phone)) errors.phoneNumbers = "Phone Number is required";
    if (!supplier.address) errors.address = "Address is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSaveSupplier = async () => {
    if (!validateForm()) return;
    const supplierData = {
      supplierCode: supplier.supplierCode,
      supplierName: supplier.name,
      supplierEmail: supplier.email,
      supplierAddress: supplier.address,
      supplierPhoneNo: supplier.phoneNumbers,
      supplierNote: supplier.notes,
      outstandingBalance: 0.0,
      activeState: true,
    };
    try {
      if (editingSupplierId) {
        await axios.put(`http://localhost:8085/api/v1/supplier/update/${editingSupplierId}`, supplierData);
        alert("Supplier updated successfully");
      } else {
        await axios.post("http://localhost:8085/api/v1/supplier/save", supplierData);
        alert("Supplier added successfully");
      }
      setSupplier(initialSupplierState);
      setEditingSupplierId(null);
    } catch (error) {
      console.error("Error saving supplier:", error);
      alert("Failed to save supplier");
    }
  };
  const handleReset = () => {
    setSupplier(initialSupplierState);
    setErrors({});
    setEditingSupplierId(null);
  };
  return (
    <div className="w-full mt-10 px-10 space-y-5">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold">{editingSupplierId ? "Edit Supplier" : "Add Supplier"}</h1>
        <div className="flex gap-5">
          <Button variant="contained" onClick={handleSaveSupplier}>
            {editingSupplierId ? "Update" : "Submit"}
          </Button>
          <Button variant="outlined" onClick={handleReset}>Reset</Button>
        </div>
      </div>
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
      {supplier.phoneNumbers.map((phone, index) => (
        <div className="flex items-center gap-2" key={index}>
          <TextField
           label={`Phone Number ${index + 1}`}
           variant="outlined"
           fullWidth
           value={phone}
           onChange={(e) => handlePhoneChange(index, e.target.value)}
           error={!!errors.phoneNumbers}
           helperText={errors.phoneNumbers}
         />
         <IconButton color="primary" onClick={addPhoneNumber}>
            <Add />
          </IconButton>
          {supplier.phoneNumbers.length > 1 && (
            <IconButton color="secondary" onClick={() => removePhoneNumber(index)}>
              <Remove />
            </IconButton>
          )}
        </div>
         ))}
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
     );
   };
   export default SupplierForm;

