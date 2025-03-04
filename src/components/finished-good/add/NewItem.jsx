  
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const initialFinishedGoodState = {
  name: "",
  description: "",
  quantityInStock: 0,
  unitPrice: 0,
  uniqueItemNumber: "",
  size: "", 
};

const FinishedGoodForm = () => {
  const [finishedGood, setFinishedGood] = useState(initialFinishedGoodState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinishedGood((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};

    if (!finishedGood.name) errors.name = "Name is required";

    if (!finishedGood.description)
      errors.description = "Description is required";

    if (
      !finishedGood.quantityInStock ||
      isNaN(finishedGood.quantityInStock) ||
      finishedGood.quantityInStock < 0
    )
      errors.quantityInStock = "Quantity must be a non-negative number";

    if (!finishedGood.unitPrice || isNaN(finishedGood.unitPrice) || finishedGood.unitPrice <= 0)
      errors.unitPrice = "Unit Price must be a positive number";

    if (!finishedGood.uniqueItemNumber)
      errors.uniqueItemNumber = "Unique Item Number is required";
    
    if (!finishedGood.size)
      errors.size = "Size is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFinishedGood = () => {
    if (!validateForm()) return;
    console.log(finishedGood);
    setFinishedGood(initialFinishedGoodState);
  };

  const handleReset = () => {
    setFinishedGood(initialFinishedGoodState);
    setErrors({});
  };

  return (
    <div className="w-full mt-10 px-10">
      <div className="flex flex-row justify-between gap-5">
        <h1 className="font-bold">Add Finished Good</h1>
        <div className="flex gap-5">
          <Button variant="contained" onClick={handleAddFinishedGood}>
            Submit
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <TextField
          name="uniqueItemNumber"
          label="Style Number"
          variant="outlined"
          fullWidth
          value={finishedGood.uniqueItemNumber}
          onChange={handleChange}
          error={!!errors.uniqueItemNumber}
          helperText={errors.uniqueItemNumber}
        />
      </div>

      <div className="mt-5">
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={finishedGood.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
      </div>

      <div className="mt-5">
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={finishedGood.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />
      </div>

      <div className="mt-5">
        <FormControl fullWidth variant="outlined" error={!!errors.size}>
          <InputLabel>Size</InputLabel>
          <Select
            name="size"
            value={finishedGood.size}
            onChange={handleChange}
            label="Size 1"
          >
            {["S", "M", "L", "XL", "2XL"].map((size) => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </Select>
          {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
        </FormControl>
      </div>

      <div className="mt-5">
        <FormControl fullWidth variant="outlined" error={!!errors.size}>
          <InputLabel>Size</InputLabel>
          <Select
            name="size"
            value={finishedGood.size}
            onChange={handleChange}
            label="Size 2"
          >
            {[ "3XL", "4XL", "5XL"].map((size) => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </Select>
          {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
        </FormControl>
      </div>

      <div className="mt-5">
        <TextField
          name="unitPrice"
          label="Unit Price 1"
          type="number"
          variant="outlined"
          fullWidth
          value={finishedGood.unitPrice}
          onChange={handleChange}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice}
        />
      </div>

      <div className="mt-5">
        <TextField
          name="unitPrice"
          label="Unit Price 2"
          type="number"
          variant="outlined"
          fullWidth
          value={finishedGood.unitPrice}
          onChange={handleChange}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice}
        />
      </div>
    </div>
  );
};

export default FinishedGoodForm;