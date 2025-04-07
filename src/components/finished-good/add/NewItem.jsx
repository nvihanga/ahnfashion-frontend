import finishedGoodApi from "../../../api/finishedGoodApi";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";


const sizeMapping = {
  "XXL": "2XL",
  "XXXL": "3XL",
  "XXXXL": "4XL",
  "XXXXXL": "5XL",
};

const initialFinishedGoodState = {
  name: "",
  description: "",
  uniqueItemNumber: "",
  sizes: [
    { size: "L", unitPrice: "" },
    { size: "XL", unitPrice: "" },
    { size: "2XL", unitPrice: "" },
    { size: "3XL", unitPrice: "" },
    { size: "4XL", unitPrice: "" },
    { size: "5XL", unitPrice: "" },
  ],
};

const FinishedGoodForm = () => {
  const [finishedGood, setFinishedGood] = useState(initialFinishedGoodState);
  const [errors, setErrors] = useState({});
  const [nextStyleNumber, setNextStyleNumber] = useState(1);

  useEffect(() => {
    finishedGoodApi.getAll()
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const lastItem = data[data.length - 1];
          setNextStyleNumber(lastItem.finishId + 1);
        }
      })
      .catch((error) => console.error("Error fetching finished goods:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinishedGood((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableChange = (index, field, value) => {
    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
      const newSizes = [...finishedGood.sizes];
      newSizes[index] = { ...newSizes[index], [field]: value };
      setFinishedGood((prev) => ({ ...prev, sizes: newSizes }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!finishedGood.name.trim()) tempErrors.name = "Name is required";
    if (!finishedGood.description.trim()) tempErrors.description = "Description is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddFinishedGood = async () => {
    if (!validateForm()) return;

    const validSizes = finishedGood.sizes.filter(
      (item) => item.unitPrice !== "" && Number(item.unitPrice) > 0
    );

    if (validSizes.length === 0) {
      alert("At least one size must have a non-zero unit price.");
      return;
    }

    const finishedGoodData = {
      finishName: finishedGood.name.trim(),
      finishDescription: finishedGood.description.trim(),
      finishedGoodVariants: validSizes.map((item) => {
        const displaySize = item.size;
        const apiSize = Object.keys(sizeMapping).find(
          (key) => sizeMapping[key] === displaySize
        ) || displaySize;
        
        return {
          size: apiSize,
          unitPrice: item.unitPrice === "" ? 0 : Number.parseFloat(item.unitPrice).toFixed(2),
          quantityInStock: 0,
        };
      }),
    };

    try {
      const response = await finishedGoodApi.create(finishedGoodData);


      if (response.status === 200 || response.status === 201) {
        alert("Finished Good added successfully!");
        setNextStyleNumber(nextStyleNumber + 1);
        setFinishedGood(initialFinishedGoodState);
        setErrors({});
      }
    } catch (error) {
      console.error("Error saving finished good:", error);
      alert("Error adding Finished Good: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Add New Finished Good
          </h1>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFinishedGood}
            className="bg-blue-600 hover:bg-blue-700"
            sx={{ borderRadius: '8px', padding: '8px 24px' }}
          >
            Save Product
          </Button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          <TextField
            label="Style Number"
            variant="outlined"
            fullWidth
            value={nextStyleNumber}
            disabled
            InputProps={{
              className: "bg-gray-50",
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
          <TextField
            name="name"
            label="Product Name"
            variant="outlined"
            fullWidth
            value={finishedGood.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
          <TextField
            name="description"
            label="Product Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={finishedGood.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
        </div>
      </div>

      {/* Sizes Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Size Variants</h2>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="font-semibold text-gray-700 py-3">Size</TableCell>
                <TableCell className="font-semibold text-gray-700 py-3">Unit Price (Rs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finishedGood.sizes.map((item, index) => (
                <TableRow
                  key={item.size}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-gray-600">{item.size}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={item.unitPrice}
                      onChange={(e) => handleTableChange(index, "unitPrice", e.target.value)}
                      inputProps={{ min: 0, step: "0.01" }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "6px",
                          width: "150px",
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default FinishedGoodForm;