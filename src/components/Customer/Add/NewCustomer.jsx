import { Button, TextField, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const initialCustomerState = {
    customerCode: "",
    customerName: "",
    email: "",
    phoneNumbers: [""],
    address: "",
    notes: "",
};

const CustomerForm = () => {
    const [customer, setCustomer] = useState(initialCustomerState);
    const [errors, setErrors] = useState({});
    const [editingCustomerId, setEditingCustomerId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (index, value) => {
        const updatedPhones = [...customer.phoneNumbers];
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
        if (!customer.customerCode) errors.customerCode = "Customer Code is required";
        if (!customer.customerName) errors.customerName = "Name is required";
        if (!customer.email) errors.email = "Email Address is required";
        if (customer.phoneNumbers.some((phone) => !phone))
            errors.phoneNumbers = "At least one phone number is required";
        if (!customer.address) errors.address = "Address is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveCustomer = async () => {
        if (!validateForm()) return;
        const customerData = {
            customerCode: customer.customerCode,
            customerName: customer.customerName,
            email: customer.email,
            address: customer.address,
            phoneNumbers: customer.phoneNumbers,
            notes: customer.notes,
        };

        try {
            if (editingCustomerId) {
                await axios.put(
                    `http://localhost:8085/api/v1/customer/update/${editingCustomerId}`,
                    customerData
                );
                alert("Customer updated successfully");
            } else {
                await axios.post(
                    "http://localhost:8085/api/v1/customer/create",
                    customerData
                );
                alert("Customer added successfully");
            }
            setCustomer(initialCustomerState);
            setEditingCustomerId(null);
        }catch (error) {
            console.error("Error saving customer:", error);
            alert("Failed to save customer");
        }
    };

    const handleReset = () => {
        setCustomer(initialCustomerState);
        setErrors({});
        setEditingCustomerId(null);
    };

    return (
        <div className="w-full px-10 mt-10 space-y-5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold">{editingCustomerId ? "Edit Customer" : "Add Customer"}</h1>
                <div className="flex gap-5">
                    <Button variant="contained" onClick={handleSaveCustomer}>
                        {editingCustomerId ? "Update" : "Submit"}
                    </Button>
                    <Button variant="outlined" onClick={handleReset}>Reset</Button>
                </div>
            </div>

            <TextField
                name="customerCode"
                label="Customer Code"
                fullWidth
                value={customer.customerCode}
                onChange={handleChange}
                error={!!errors.customerCode}
                helperText={errors.customerCode}
            />

            <TextField
                name="customerName"
                label="Name"
                fullWidth
                value={customer.customerName}
                onChange={handleChange}
                error={!!errors.customerName}
                helperText={errors.customerName}
            />

            <TextField
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={customer.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
            />

            {customer.phoneNumbers.map((phone, index) => (
                <div className="flex items-center gap-2" key={index}>
                    <TextField
                        label={`Phone Number ${index + 1}`}
                        fullWidth
                        value={phone}
                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                        error={!!errors.phoneNumbers}
                        helperText={index === 0 ? errors.phoneNumbers : ""}
                    />
                    <IconButton color="secondary" onClick={() => removePhoneNumber(index)}>
                        <Remove />
                    </IconButton>
                </div>
            ))}
            <Button variant="outlined" startIcon={<Add />} onClick={addPhoneNumber}>
                Add Phone Number
            </Button>

            <TextField
                name="address"
                label="Address"
                fullWidth
                multiline
                rows={2}
                value={customer.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
            />

            <TextField
                name="notes"
                label="Notes"
                fullWidth
                multiline
                rows={3}
                value={customer.notes}
                onChange={handleChange}
            />
        </div>
    );
};

export default CustomerForm;