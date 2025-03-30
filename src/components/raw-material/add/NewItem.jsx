import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

const productTypes = [
  { id: 1, name: "Buttons" },
  { id: 2, name: "Threads" },
  { id: 3, name: "Fabrics" },
  { id: 4, name: "Labels" },
];

const suppliers = [
  { id: 1, name: "Naturub Industries (Pvt) Ltd" },
  { id: 2, name: "CIB Accessories" },
  { id: 3, name: "Chathura Enterprices" },
  { id: 4, name: "Sanko Texttiles" },
];

const initialProductState = {
  productName: "",
  productType: "",
  quantity: 0,
  supplier: "",
  price: 0,
};

const NewItem = () => {
  const [product, setProduct] = useState(initialProductState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!product.productName) errors.productName = "Product Name is required";
    if (!product.productType) errors.productType = "Product Type is required";
    if (!product.quantity || isNaN(product.quantity) || product.quantity <= 0)
      errors.quantity = "Quantity must be a positive number";
    if (!product.supplier) errors.supplier = "Supplier is required";
    if (!product.price || isNaN(product.price) || product.price <= 0)
      errors.price = "Price must be a positive number";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddNewItem = () => {
    if (!validateForm()) return;
    console.log(product);
    setProduct(initialProductState);
  };

  const handleReset = () => {
    setProduct(initialProductState);
    setErrors({});
  };

  return (
    <div className="w-full mt-10 px-10">
      <div className="flex flex-row justify-between gap-5">
        <h1 className="font-bold">Add New Item</h1>
        <div className="flex gap-5">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-full"
            onClick={handleAddNewItem}
            aria-label="Submit form"
          >
            Submit
          </button>
          <Button
            variant="outlined"
            onClick={handleReset}
            aria-label="Reset form"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Product Name */}
      <div className="mt-5">
        <TextField
          name="productName"
          label="Product Name"
          variant="outlined"
          fullWidth
          value={product.productName}
          onChange={handleChange}
          error={!!errors.productName}
          helperText={errors.productName}
        />
      </div>

      {/* Product Type */}
      <div className="mt-5">
        <FormControl fullWidth error={!!errors.productType}>
          <InputLabel id="Product_Type">Product Type</InputLabel>
          <Select
            label="Product_Type"
            name="productType"
            value={product.productType}
            onChange={handleChange}
          >
            {productTypes.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          {errors.productType && (
            <FormHelperText>{errors.productType}</FormHelperText>
          )}
        </FormControl>
      </div>

      {/* Quantity */}
      <div className="mt-5">
        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          variant="outlined"
          fullWidth
          value={product.quantity}
          onChange={handleChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
        />
      </div>

      {/* Supplier */}
      <div className="mt-5">
        <FormControl fullWidth error={!!errors.supplier}>
          <InputLabel id="Supplier">Supplier</InputLabel>
          <Select
            label="Supplier"
            name="supplier"
            value={product.supplier}
            onChange={handleChange}
          >
            {suppliers.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
          {errors.supplier && (
            <FormHelperText>{errors.supplier}</FormHelperText>
          )}
        </FormControl>
      </div>

      {/* Price */}
      <div className="mt-5">
        <TextField
          name="price"
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          value={product.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
        />
      </div>
    </div>
  );
};

export default NewItem;
