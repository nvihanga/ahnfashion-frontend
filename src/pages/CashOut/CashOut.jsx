import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { format } from "date-fns";

const initialCashOutState = {
  reason: "",
  amount: "",
  placeDate: format(new Date(), "yyyy-MM-dd"), // format date for input type="date"
};

const CashOutForm = ({ refreshList }) => {
  const [cashOut, setCashOut] = useState(initialCashOutState);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCashOut((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errs = {};
    if (!cashOut.reason.trim()) errs.reason = "Reason is required";
    if (!cashOut.amount || isNaN(cashOut.amount))
      errs.amount = "Valid amount is required";
    if (!cashOut.placeDate) errs.placeDate = "Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveCashOut = async () => {
    if (!validateForm()) return;

    const cashOutData = {
      reason: cashOut.reason.trim(),
      amount: parseFloat(cashOut.amount),
      placeDate: new Date(cashOut.placeDate).toISOString().split("T")[0], // format as yyyy-MM-dd
    };

    console.log("Sending CashOut data:", cashOutData); // For debugging

    try {
      await axios.post("http://localhost:8085/api/v1/cashout", cashOutData);
      enqueueSnackbar("Cash out recorded successfully!", {
        variant: "success",
      });
      setCashOut(initialCashOutState);
      if (refreshList) refreshList();
    } catch (error) {
      console.error("Cash out error:", error);
      enqueueSnackbar(
        error.response?.data?.message || "Failed to save cash out",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <div className="w-full mt-10 px-10 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Record New Cash Out</h1>
        <div className="flex gap-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveCashOut}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setCashOut(initialCashOutState)}
          >
            Clear
          </Button>
        </div>
      </div>

      <TextField
        name="reason"
        label="Expense Reason"
        fullWidth
        value={cashOut.reason}
        onChange={handleChange}
        error={!!errors.reason}
        helperText={errors.reason || "Enter reason"}
      />

      <TextField
        name="amount"
        label="Amount (Rs)"
        fullWidth
        type="number"
        value={cashOut.amount}
        onChange={handleChange}
        error={!!errors.amount}
        helperText={errors.amount || "Enter amount"}
        InputProps={{
          inputProps: { min: 0 },
          startAdornment: <span style={{ marginRight: 4 }}>Rs</span>,
        }}
      />

      <TextField
        name="placeDate"
        label="Date"
        type="date"
        fullWidth
        value={cashOut.placeDate}
        onChange={handleChange}
        error={!!errors.placeDate}
        helperText={errors.placeDate || "Select date"}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: format(new Date(), "yyyy-MM-dd") }}
      />
    </div>
  );
};

export default CashOutForm;
//updated