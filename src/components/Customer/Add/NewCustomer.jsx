import { Button, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const initialCustomerState = {
    customerName: "",
    email: "",
    phoneNumbers: [""],
    address: "",
    notes: "",
};

const CustomerForm = () => {
    const [customer, setCustomer] = useState(initialCustomerState);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

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
        if (!customer.customerName) errors.customerName = "Name is required";
        if (!customer.email) errors.email = "Email Address is required";
        if (customer.phoneNumbers.some((phone) => !phone)) errors.phoneNumbers = "Phone Number is required";
        if (!customer.address) errors.address = "Address is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveCustomer = async () => {
        if (!validateForm()) return;

        const customerData = {
            customerName: customer.customerName,
            email: customer.email,
            phoneNumbers: customer.phoneNumbers,
            address: customer.address,
            notes: customer.notes,
        };

        try {
            await axios.post("http://localhost:8085/api/v1/customer/create", customerData);
            setSuccess(true);
            setCustomer(initialCustomerState);
        } catch (error) {
            console.error("Error saving customer:", error);
            alert("Failed to save customer");
        }
    };

    const handleReset = () => {
        setCustomer(initialCustomerState);
        setErrors({});
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
    };

    return (
        <>
            <div className="w-full mt-10 px-10 space-y-5">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold">Add Customer</h1>
                    <div className="flex gap-5">
                        <Button variant="contained" onClick={handleSaveCustomer}>
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={handleReset}>Reset</Button>
                    </div>
                </div>

                <TextField
                    name="customerName"
                    label="Name"
                    variant="outlined"
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
                    variant="outlined"
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
                        {customer.phoneNumbers.length > 1 && (
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
                    value={customer.address}
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
                    value={customer.notes}
                    onChange={handleChange}
                />
            </div>

            <Snackbar
                open={success}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Customer added successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default CustomerForm;