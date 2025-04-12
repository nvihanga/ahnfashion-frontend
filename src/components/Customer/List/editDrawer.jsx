import React, { useState, useEffect } from "react";
import {
    Drawer,
    TextField,
    Button,
    Typography,
    IconButton,
    Box,
    Divider,
    Stack,
    Snackbar,
    Alert,
    FormHelperText,
} from "@mui/material";
import { MdClose } from "react-icons/md";

const EditDrawer = ({ open, onClose, item, onSave }) => {
    const [formData, setFormData] = useState({
        customerId: "",
        customerName: "",
        customerEmail: "",
        customerPhoneNo: [""],
        customerAddress: "",
        customerNote: "",
    });
    const [success, setSuccess] = useState(false);
    const [phoneErrors, setPhoneErrors] = useState([]);

    useEffect(() => {
        if (item) {
            setFormData({
                ...item,
                customerPhoneNo: Array.isArray(item.customerPhoneNo) 
                    ? [...item.customerPhoneNo] 
                    : [item.customerPhoneNo || ""],
            });
            // Initialize phone errors array with empty strings
            setPhoneErrors(Array.isArray(item.customerPhoneNo) 
                ? Array(item.customerPhoneNo.length).fill("") 
                : [""]
            );
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (index, value) => {
        // Only allow digits
        const numericValue = value.replace(/\D/g, '');
        
        // Limit to 10 digits (standard Sri Lankan format)
        const limitedValue = numericValue.slice(0, 10);
        
        const updatedPhones = [...formData.customerPhoneNo];
        updatedPhones[index] = limitedValue;
        
        // Update phone errors - Sri Lankan mobile numbers should have 10 digits starting with 0
        const updatedErrors = [...phoneErrors];
        
        if (limitedValue.length === 0) {
            updatedErrors[index] = "";
        } else if (limitedValue.length !== 10) {
            updatedErrors[index] = "Phone number must be exactly 10 digits";
        } else {
            updatedErrors[index] = "";
        }
            
        setPhoneErrors(updatedErrors);
        setFormData({
            ...formData,
            customerPhoneNo: updatedPhones,
        });
    };

    const addPhoneField = () => {
        setFormData({
            ...formData,
            customerPhoneNo: [...formData.customerPhoneNo, ""],
        });
        setPhoneErrors([...phoneErrors, ""]);
    };

    const removePhoneField = (index) => {
        if (formData.customerPhoneNo.length > 1) {
            const updatedPhones = formData.customerPhoneNo.filter((_, i) => i !== index);
            const updatedErrors = phoneErrors.filter((_, i) => i !== index);
            
            setFormData({
                ...formData,
                customerPhoneNo: updatedPhones
            });
            setPhoneErrors(updatedErrors);
        }
    };

    const isFormValid = () => {
        // Check if any phone error exists
        const hasPhoneError = phoneErrors.some(error => error !== "");
        
        // Check if any phone number is invalid (not empty and either not 10 digits or doesn't start with 0)
        const hasInvalidPhone = formData.customerPhoneNo.some(phone => 
            phone.length > 0 && (phone.length !== 10 || !phone.startsWith('0'))
        );
        
        return !hasPhoneError && !hasInvalidPhone;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const newPhoneErrors = formData.customerPhoneNo.map(phone => {
            if (phone.length === 0) return "";
            if (phone.length !== 10) return "Phone number must be exactly 10 digits";
            if (!phone.startsWith('0')) return "Sri Lankan phone number must start with 0";
            return "";
        });
        
        setPhoneErrors(newPhoneErrors);
        
        if (isFormValid()) {
            try {
                await onSave(formData);
                setSuccess(true);
                onClose(); 
            } catch (error) {
                console.error("Error saving customer data:", error);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
    };

    
    const formatPhoneForDisplay = (phone) => {
        if (phone.length === 10) {
            return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 10)}`;
        }
        return phone;
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: "400px",
                        padding: "20px",
                        boxSizing: "border-box",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Edit Customer</Typography>
                    <IconButton onClick={onClose}>
                        <MdClose />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            name="customerName"
                            label="Customer Name"
                            value={formData.customerName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            name="customerEmail"
                            label="Email"
                            type="email"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>Phone Numbers</Typography>
                            {formData.customerPhoneNo.map((phone, index) => (
                                <Box key={index} sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                                    <Box sx={{ display: "flex" }}>
                                        <TextField
                                            value={phone}
                                            onChange={(e) => handlePhoneChange(index, e.target.value)}
                                            fullWidth
                                            label={`Phone ${index + 1}`}
                                            sx={{ mr: 1 }}
                                            error={!!phoneErrors[index]}
                                            helperText={phoneErrors[index]}
                                            inputProps={{
                                                maxLength: 10,
                                                inputMode: 'numeric',
                                            }}
                                        />
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => removePhoneField(index)}
                                            disabled={formData.customerPhoneNo.length <= 1}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                    {phone.length === 10 && phone.startsWith('0') && (
                                        <FormHelperText sx={{ ml: 1 }}>
                                            Formatted: {formatPhoneForDisplay(phone)}
                                        </FormHelperText>
                                    )}
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                onClick={addPhoneField}
                                sx={{ mt: 1 }}
                            >
                                Add Phone Number
                            </Button>
                        </Box>

                        <TextField
                            name="customerAddress"
                            label="Address"
                            value={formData.customerAddress}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={2}
                        />

                        <TextField
                            name="customerNote"
                            label="Notes"
                            value={formData.customerNote}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                        />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                disabled={!isFormValid()}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Drawer>

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
                    Customer information updated successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditDrawer;