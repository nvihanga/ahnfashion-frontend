import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const productNameArray = [
  { id: 1, name: "Buttons" },
  { id: 2, name: "Threads" },
  { id: 3, name: "Fabrics" },
  { id: 4, name: "Labels" },
];

const RawMaterialStockAdd = ({ setStockList, stockList }) => {
  const [productName, setProductName] = useState("");

  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!productName) errors.productName = "Product Name is required";

    if (!quantity || isNaN(quantity) || quantity <= 0)
      errors.quantity = "Quantity must be a positive number";
    if (!date) errors.date = "Date is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddToList = () => {
    if (!validateForm()) return;

    const selectedProduct = productNameArray.find(
      (product) => product.name === productName
    );

    const stock = {
      productName: selectedProduct.name,
      productId: selectedProduct.id,

      description: description,
      quantity: quantity,
      date: date ? date.toDate() : null, // Convert Dayjs object to JavaScript Date object
    };

    setStockList([...stockList, stock]);

    setProductName("");

    setQuantity("");
    setDescription("");
    setDate(null);
    setErrors({});
  };

  const handlePublish = () => {
    console.log(stockList);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
    if (errors.productName) {
      setErrors((prevErrors) => ({ ...prevErrors, productName: "" }));
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    if (errors.quantity) {
      setErrors((prevErrors) => ({ ...prevErrors, quantity: "" }));
    }
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
    if (errors.date) {
      setErrors((prevErrors) => ({ ...prevErrors, date: "" }));
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1>
          <strong>Stock Add</strong>
        </h1>
        <Button variant="contained" onClick={handlePublish}>
          Publish
        </Button>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <div className="w-4/5">
          <div>
            <FormControl fullWidth error={!!errors.productName}>
              <InputLabel id="product_name">Product Name</InputLabel>
              <Select
                id="product_name"
                value={productName}
                label="Product Name"
                onChange={handleProductNameChange}
              >
                {productNameArray.map((name) => (
                  <MenuItem key={name.id} value={name.name}>
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.productName && (
                <FormHelperText>{errors.productName}</FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="flex flex-row mt-5 justify-between">
            <div>
              <FormControl fullWidth>
                <TextField
                  id="quantity"
                  label="Quantity"
                  variant="outlined"
                  value={quantity}
                  error={!!errors.quantity}
                  onChange={handleQuantityChange}
                  helperText={errors.quantity}
                />
              </FormControl>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: { error: errors.date, helperText: errors.date },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <Button variant="contained" onClick={handleAddToList}>
            ADD TO LIST
          </Button>
        </div>
      </div>
    </div>
  );
};

RawMaterialStockAdd.propTypes = {
  setStockList: PropTypes.func.isRequired,
  stockList: PropTypes.array.isRequired,
};

export default RawMaterialStockAdd;
