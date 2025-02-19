import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

const NewType = () => {
  const [addNewType, setAddNewType] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log(addNewType);
    setAddNewType("");
    setErrors({});
  };

  const handleReset = () => {
    setAddNewType("");
    setErrors({});
  };

  const validateForm = () => {
    let errors = {};

    if (!addNewType) errors.addNewType = "Type  is Required";
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div className="w-full mt-10 px-10 py-8">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="font-bold">Add New Type</h1>
        </div>
        <div className="flex gap-5">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
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
