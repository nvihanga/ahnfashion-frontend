


import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const productNameArray = [
  { id: 1, name: "Shirt" },
  { id: 2, name: "Pants" },
  { id: 3, name: "Jacket" },
  { id: 4, name: "Dress" },
];

const FinishedGoodStockAdd = () => {
  const [styleNumber, setStyleNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const handleAddToList = () => {
    console.log({ styleNumber, productName, description, quantity, unitPrice });
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1>Finished Good Stock Add</h1>
        <Button variant="contained">Publish</Button>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <div className="w-4/5">
          {/* Style Number */}
          <div>
            <FormControl fullWidth>
              <TextField
                id="style_number"
                label="Style Number"
                variant="outlined"
                value={styleNumber}
                onChange={(e) => setStyleNumber(e.target.value)}
              />
            </FormControl>
          </div>
          {/* Product Name */}
          <div className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="product_name">Product Name</InputLabel>
              <Select
                id="product_name"
                value={productName}
                label="Product Name"
                onChange={(e) => setProductName(e.target.value)}
              >
                {productNameArray.map((name) => (
                  <MenuItem key={name.id} value={name.name}>
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Description */}
          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </div>
          {/* Quantity */}
          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                id="quantity"
                label="Quantity"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
          </div>
          {/* Unit Price */}
          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                id="unit_price"
                label="Unit Price"
                variant="outlined"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </FormControl>
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

export default FinishedGoodStockAdd;



