import { Button, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import supplierApi from '../../../api/supplierApi';  

const initialSupplierState = {
    supplierCode: "",
    supplierName: "",
    supplierEmail: "",
    supplierPhoneNo: [""], 
    supplierAddress: "",
    supplierNote: "",
};

const SupplierForm = () => {
    const [supplier, setSupplier] = useState(initialSupplierState);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (index, value) => {
        const updatedPhones = [...supplier.supplierPhoneNo];
        updatedPhones[index] = value;
        setSupplier((prev) => ({ ...prev, supplierPhoneNo: updatedPhones }));
    };

    const addPhoneNumber = () => {
        setSupplier((prev) => ({ 
            ...prev, 
            supplierPhoneNo: [...prev.supplierPhoneNo, ""] 
        }));
    };

    const removePhoneNumber = (index) => {
        setSupplier((prev) => ({
            ...prev,
            supplierPhoneNo: prev.supplierPhoneNo.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        let errors = {};
        if (!supplier.supplierCode) errors.supplierCode = "Supplier Code is required";
        if (!supplier.supplierName) errors.supplierName = "Name is required";
        if (!supplier.supplierEmail) errors.supplierEmail = "Email Address is required";
        if (supplier.supplierPhoneNo.some((phone) => !phone)) errors.supplierPhoneNo = "Phone Number is required";
        if (!supplier.supplierAddress) errors.supplierAddress = "Address is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveSupplier = async () => {
        if (!validateForm()) return;

        const supplierData = {
            supplierCode: supplier.supplierCode,
            supplierName: supplier.supplierName,
            supplierEmail: supplier.supplierEmail,
            supplierAddress: supplier.supplierAddress,
            supplierPhoneNo: supplier.supplierPhoneNo.filter(phone => phone !== ""),
            supplierNote: supplier.supplierNote || "",
        };

        try {
            const exists = await supplierApi.checkCodeExists(supplier.supplierCode);  // Check if code exists

            if (exists) {
                setErrors(prev => ({ ...prev, supplierCode: "Supplier Code already exists" }));
                return;
            }

            await supplierApi.create(supplierData);  // Save the supplier data
            setSuccess(true);
            setSupplier(initialSupplierState);
        } catch (error) {
            console.error("Error saving supplier:", error);
            if (error.response?.status === 401) {
                setErrorMessage("Unauthorized: Please log in.");
            } else {
                setErrorMessage("Failed to save supplier. Please try again.");
            }
        }
    };

    const handleReset = () => {
        setSupplier(initialSupplierState);
        setErrors({});
        setErrorMessage('');
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
        setErrorMessage('');
    };

    return (
        <>
            <div className="w-full mt-10 px-10 space-y-5">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold">Add Supplier</h1>
                    <div className="flex gap-5">
                        <Button variant="contained" onClick={handleSaveSupplier}>
                            Submit
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
                    name="supplierName"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={supplier.supplierName}
                    onChange={handleChange}
                    error={!!errors.supplierName}
                    helperText={errors.supplierName}
                />

                <TextField
                    name="supplierEmail"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={supplier.supplierEmail}
                    onChange={handleChange}
                    error={!!errors.supplierEmail}
                    helperText={errors.supplierEmail}
                />

                {supplier.supplierPhoneNo.map((phone, index) => (
                    <div className="flex items-center gap-2" key={index}>
                        <TextField
                            label={`Phone Number ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            value={phone}
                            onChange={(e) => handlePhoneChange(index, e.target.value)}
                            error={!!errors.supplierPhoneNo}
                            helperText={errors.supplierPhoneNo}
                        />
                        <IconButton color="primary" onClick={addPhoneNumber}>
                            <Add />
                        </IconButton>
                        {supplier.supplierPhoneNo.length > 1 && (
                            <IconButton color="secondary" onClick={() => removePhoneNumber(index)}>
                                <Remove />
                            </IconButton>
                        )}
                    </div>
                ))}

                <TextField
                    name="supplierAddress"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={supplier.supplierAddress}
                    onChange={handleChange}
                    error={!!errors.supplierAddress}
                    helperText={errors.supplierAddress}
                />

                <TextField
                    name="supplierNote"
                    label="Notes"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={supplier.supplierNote}
                    onChange={handleChange}
                />
            </div>

            <Snackbar
                open={success || !!errorMessage}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={errorMessage ? "error" : "success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorMessage || "Supplier added successfully!"}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SupplierForm;
