import { Button, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import customerApi from '../../../api/customerApi'; // import customerApi

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
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handlePhoneChange = (index, value) => {
        // Only allow digits and limit to 10 characters
        const phoneRegex = /^[0-9]*$/;
        
        if (value === "" || (phoneRegex.test(value) && value.length <= 10)) {
            const updatedPhones = [...customer.phoneNumbers];
            updatedPhones[index] = value;
            setCustomer((prev) => ({ ...prev, phoneNumbers: updatedPhones }));
            
            // Clear phone error when user corrects it
            if (errors.phoneNumbers) {
                setErrors((prev) => ({ ...prev, phoneNumbers: null }));
            }
        }
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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        return phone.length === 10;
    };

    const validateForm = () => {
        let tempErrors = {};
        
        // Name validation
        if (!customer.customerName) {
            tempErrors.customerName = "Name is required";
        }
        
        // Email validation
        if (!customer.email) {
            tempErrors.email = "Email Address is required";
        } else if (!validateEmail(customer.email)) {
            tempErrors.email = "Please enter a valid email address";
        }
        
        // Phone validation
        const phoneErrors = {};
        customer.phoneNumbers.forEach((phone, index) => {
            if (!phone) {
                phoneErrors[index] = "Phone Number is required";
            } else if (!validatePhoneNumber(phone)) {
                phoneErrors[index] = "Phone Number must be exactly 10 digits";
            }
        });
        
        if (Object.keys(phoneErrors).length > 0) {
            tempErrors.phoneNumbers = "One or more phone numbers are invalid";
            tempErrors.phoneDetails = phoneErrors;
        }
        
        // Address validation
        if (!customer.address) {
            tempErrors.address = "Address is required";
        }
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSaveCustomer = async () => {
        if (!validateForm()) {
            setSnackbar({
                open: true,
                message: "Please correct the errors before submitting",
                severity: "error"
            });
            return;
        }

        const customerData = {
            customerName: customer.customerName,
            email: customer.email,
            phoneNumbers: customer.phoneNumbers,
            address: customer.address,
            notes: customer.notes,
        };

        try {
            await customerApi.create(customerData); // Use the API method here
            setSuccess(true);
            setSnackbar({
                open: true,
                message: "Customer added successfully!",
                severity: "success"
            });
            setCustomer(initialCustomerState);
            setErrors({});
        } catch (error) {
            console.error("Error saving customer:", error);
            setSnackbar({
                open: true,
                message: "Failed to save customer: " + (error.response?.data?.message || error.message),
                severity: "error"
            });
        }
    };

    const handleReset = () => {
        setCustomer(initialCustomerState);
        setErrors({});
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
        setSnackbar(prev => ({ ...prev, open: false }));
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
                            error={!!(errors.phoneDetails && errors.phoneDetails[index])}
                            helperText={errors.phoneDetails && errors.phoneDetails[index]}
                            inputProps={{
                                maxLength: 10,
                                inputMode: "numeric"
                            }}
                            placeholder="10 digit number"
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

            {/* Success Snackbar */}
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

            {/* Error/Success Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ 
                    width: { xs: '90%', sm: '400px' },
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CustomerForm;