import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { addRawMaterialType } from "../../api/rawmaterial/api";
import Toast from "../../common/Toast";

const NewType = () => {
  const [addNewType, setAddNewType] = useState("");
  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    const validateForm = () => {
      let tempErrors = {};
      if (!addNewType) tempErrors.addNewType = "Type is Required";
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };

    if (!validateForm()) return;

    try {
      const result = await addRawMaterialType(addNewType);
      setToast({
        open: true,
        severity: "success",
        message: "Raw material type added successfully :" + result.data,
      });
      setAddNewType("");
      setErrors({});
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message:
          error.response?.data && typeof error.response.data === "object"
            ? error.response.data.errorMessage ||
              JSON.stringify(error.response.data)
            : error.response?.data ||
              error.message ||
              "Failed to add raw material type",
      });
    }
  };

  const handleReset = () => {
    setAddNewType("");
    setErrors({});
  };

  return (
    <div className="w-full mt-10 px-10 py-8">
      <Toast
        open={toast.open}
        handleClose={handleCloseToast}
        severity={toast.severity}
        message={toast.message}
      />
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="font-bold">Add New Type</h1>
        </div>
        <div className="flex gap-5">
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <FormControl fullWidth id="text area">
          <div className="flex gap-5 flex-col">
            <TextField
              id="Add_New_Type"
              label="Add New Type"
              variant="outlined"
              value={addNewType}
              onChange={(e) => setAddNewType(e.target.value)}
              helperText={errors.addNewType}
              error={!!errors.addNewType}
            />
          </div>
        </FormControl>
      </div>
      <div></div>
    </div>
  );
};

export default NewType;
