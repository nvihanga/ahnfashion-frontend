import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
const supplier = [
  { id: 1, name: "Supplier A" },
  { id: 2, name: "Supplier B" },
  { id: 3, name: "Supplier C" },
];

const InvoiceInformation = () => {
  const [value, setValue] = useState();
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="font-bold ">Invoice Information</h1>
        </div>
        <div className="flex flex-row gap-10">
          <Button variant="contained">Discard</Button>
          <Button variant="contained">Publish</Button>
        </div>
      </div>

      <div className="flex flex-row gap-20 mt-10">
        <div>
          <TextField id="invoiceNo" label="Invoice Number" variant="outlined" />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="mt-8">
        <FormControl fullWidth>
          <InputLabel id="supplier">Supplier</InputLabel>
          <Select labelId="supplier" name="supplier">
            {supplier.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="mt-10">
        <Button variant="contained">+ADD Raw Material</Button>
      </div>
    </>
  );
};

export default InvoiceInformation;
