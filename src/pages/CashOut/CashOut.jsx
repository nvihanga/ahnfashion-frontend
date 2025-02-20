import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const initialCashOutState = {
    reason: "",
    amount: "",
    date: "",
};

const CashOutForm = () => {
    const [cashOut, setCashOut] = useState(initialCashOutState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCashOut((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let errors = {};
        if (!cashOut.reason) errors.reason = "Reason is required";
        if (!cashOut.amount) errors.amount = "Amount is required";
        if (!cashOut.date) errors.date = "Date is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveCashOut = async () => {
        if (!validateForm()) return;

        const cashOutData = {
            reason: cashOut.reason,
            amount: cashOut.amount,
            date: cashOut.date,
        };

        try {
            await axios.post("http://localhost:8085/api/v1/CashOut/save", cashOutData);
            alert("Cash out recorded successfully");
            setCashOut(initialCashOutState);
        } catch (error) {
            console.error("Error saving cash out:", error);
            alert("Failed to save cash out");
        }
    };

    const handleReset = () => {
        setCashOut(initialCashOutState);
        setErrors({});
    };

    return (
        <div className="w-full mt-10 px-10 space-y-5">
            <div className="flex flex-row justify-between items-center">
                <h1 className="font-bold">Cash Out</h1>
                <div className="flex gap-5">
                    <Button variant="contained" onClick={handleSaveCashOut}>
                        Cash out
                    </Button>
                    <Button variant="outlined" onClick={handleReset}>Discard</Button>
                </div>
            </div>

            <TextField
                name="reason"
                label="Reason"
                variant="outlined"
                fullWidth
                value={cashOut.reason}
                onChange={handleChange}
                error={!!errors.reason}
                helperText={errors.reason}
            />

            <TextField
                name="amount"
                label="Amount"
                type="number"
                variant="outlined"
                fullWidth
                value={cashOut.amount}
                onChange={handleChange}
                error={!!errors.amount}
                helperText={errors.amount}
            />

            <TextField
                name="date"
                label="Place Date"
                type="date"
                variant="outlined"
                fullWidth
                value={cashOut.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
};

export default CashOutForm;