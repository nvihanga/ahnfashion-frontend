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
  { id: 1, name: "Cotton" },
  { id: 2, name: "Silk" },
  { id: 3, name: "Wool" },
  { id: 4, name: "Polyester" },
];
const supplierArray = [
  { id: 1, name: "Supplier A" },
  { id: 2, name: "Supplier B" },
  { id: 3, name: "Supplier C" },
  { id: 4, name: "Supplier D" },
];

const RawMaterialStockAdd = () => {
  const product = {
    id: null,
    name: "",
  };

  const [productName, setProductName] = useState(product);
  const [supplier, setSupplier] = useState([]);
  const [quantitiy, setQuantity] = useState();

  const handleAddToList = () => {
    console.log(productName, supplier, quantitiy);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1>Stock Add</h1>
        <Button variant="contained">Publish</Button>
      </div>
      <div className="flex flex-row  justify-between mt-5">
        <div className="w-4/5">
          <div>
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
          <div className=" mt-5">
            <FormControl fullWidth>
              <TextField
                id="quantity"
                label="Quantity"
                variant="outlined"
                value={quantitiy}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="supplier">Supplier</InputLabel>
              <Select
                id="supplier"
                value={supplier}
                label="supplier"
                onChange={(e) => setSupplier(e.target.value)}
              >
                {supplierArray.map((name) => (
                  <MenuItem key={name.id} value={name.name}>
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
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

export default RawMaterialStockAdd;
