import { Button, TextField, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const initialCustomerState = {
    CustomerCode: "",
    name: "",
    email: "",
    phoneNumbers: [""],
    address: "",
    notes: "",
};

const CustomerForm = () => {
    const [Customer, setCustomer] = useState(initialCustomerState);
    const [errors, setErrors] = useState({});
    const [editingCustomerId, setEditingCustomerId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (index, value) => {
        const updatedPhones = [...Customer.phoneNumbers];
        updatedPhones[index] = value;
        setCustomer((prev) => ({ ...prev, phoneNumbers: updatedPhones }));
    };

    const addPhoneNumber = () => {
        setCustomer((prev) => ({ ...prev, phoneNumbers: [...prev.phoneNumbers, ""] }));
    };

    const removePhoneNumber = (index) => {
        setCustomer((prev) => ({
            ...prev,
            phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        let errors = {};
        if (!Customer.CustomerCode) errors.CustomerCode = "Customer Code is required";
        if (!Customer.name) errors.name = "Name is required";
        if (!Customer.email) errors.email = "Email Address is required";
        if (Customer.phoneNumbers.some((phone) => !phone)) errors.phoneNumbers = "Phone Number is required";
        if (!Customer.address) errors.address = "Address is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveCustomer = async () => {
        if (!validateForm()) return;

        const CustomerData = {
            CustomerCode: Customer.CustomerCode,
            CustomerName: Customer.name,
            CustomerEmail: Customer.email,
            CustomerAddress: Customer.address,
            CustomerPhoneNo: Customer.phoneNumbers,
            CustomerNote: Customer.notes,
            outstandingBalance: 0.0,
            activeState: true,
        };

        try {
            if (editingCustomerId) {
                await axios.put(`http://localhost:8085/api/v1/Customer/update/${editingCustomerId}`, CustomerData);
                alert("Customer updated successfully");
            } else {
                await axios.post("http://localhost:8085/api/v1/Customer/save", CustomerData);
                alert("Customer added successfully");
            }
            setCustomer(initialCustomerState);
            setEditingCustomerId(null);
        } catch (error) {
            console.error("Error saving Customer:", error);
            alert("Failed to save Customer");
        }
    };

    const handleReset = () => {
        setCustomer(initialCustomerState);
        setErrors({});
        setEditingCustomerId(null);
    };

    return (
        <div className="w-full mt-10 px-10 space-y-5">
            <div className="flex flex-row justify-between items-center">
                <h1 className="font-bold">{editingCustomerId ? "Edit Customer" : "Add Customer"}</h1>
                <div className="flex gap-5">
                    <Button variant="contained" onClick={handleSaveCustomer}>
                        {editingCustomerId ? "Update" : "Submit"}
                    </Button>
                    <Button variant="outlined" onClick={handleReset}>Reset</Button>
                </div>
            </div>

            <TextField
                name="CustomerCode"
                label="Customer Code"
                variant="outlined"
                fullWidth
                value={Customer.CustomerCode}
                onChange={handleChange}
                error={!!errors.CustomerCode}
                helperText={errors.CustomerCode}
            />

            <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={Customer.name}
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
                value={Customer.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
            />

            {Customer.phoneNumbers.map((phone, index) => (
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
                    {Customer.phoneNumbers.length > 1 && (
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
                value={Customer.address}
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
                value={Customer.notes}
                onChange={handleChange}
            />
        </div>
    );
};

export default CustomerForm;