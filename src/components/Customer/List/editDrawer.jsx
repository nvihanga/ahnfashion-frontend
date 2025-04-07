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

    useEffect(() => {
        if (item) {
            setFormData({
                ...item,
                customerPhoneNo: Array.isArray(item.customerPhoneNo) 
                    ? [...item.customerPhoneNo] 
                    : [item.customerPhoneNo || ""],
            });
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
        const updatedPhones = [...formData.customerPhoneNo];
        updatedPhones[index] = value;
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
    };

    const removePhoneField = (index) => {
        if (formData.customerPhoneNo.length > 1) {
            const updatedPhones = formData.customerPhoneNo.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                customerPhoneNo: updatedPhones
            });
            // Note: We don't call onSave here anymore, and we don't close the drawer
            // The changes will be saved only when clicking "Save Changes"
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSave(formData);
            setSuccess(true);
            onClose(); // Close drawer only after successful save
        } catch (error) {
            console.error("Error saving customer data:", error);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
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
                                <Box key={index} sx={{ display: "flex", mb: 1 }}>
                                    <TextField
                                        value={phone}
                                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                                        fullWidth
                                        label={`Phone ${index + 1}`}
                                        sx={{ mr: 1 }}
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
                            <Button type="submit" variant="contained" color="primary">
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