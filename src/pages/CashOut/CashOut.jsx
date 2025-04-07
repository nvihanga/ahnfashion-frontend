import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import cashOutApi from '../../api/cashOutApi'; 

const initialCashOutState = {
  reason: "",
  amount: "",
  date: format(new Date(), "yyyy-MM-dd"),
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
    if (!cashOut.date) errs.date = "Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveCashOut = async () => {
    if (!validateForm()) return;

    const cashOutData = {
      reason: cashOut.reason.trim(),
      amount: parseFloat(cashOut.amount),
      date: cashOut.date,
    };

    try {
      await cashOutApi.create(cashOutData); // Use the API's create method
      enqueueSnackbar("Cash out recorded successfully!", {
        variant: "success",
      });
      setCashOut(initialCashOutState);
      refreshList && refreshList();
    } catch (error) {
      console.error("Cash out error:", error);
      enqueueSnackbar("Failed to save cash out", { variant: "error" });
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
        label="Amount (LKR)"
        fullWidth
        type="number"
        value={cashOut.amount}
        onChange={handleChange}
        error={!!errors.amount}
        helperText={errors.amount || "Enter amount"}
        InputProps={{
          inputProps: { min: 0 },
          startAdornment: <span style={{ marginRight: 4 }}>Rs.</span>,
        }}
      />
      <TextField
        name="date"
        label="Date"
        type="date"
        fullWidth
        value={cashOut.date}
        onChange={handleChange}
        error={!!errors.date}
        helperText={errors.date || "Select date"}
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: format(new Date(), "yyyy-MM-dd") }}
      />
    </div>
  );
};

export default CashOutForm;
