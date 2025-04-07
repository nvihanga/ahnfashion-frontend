import {
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getRawMaterials, getSuppliers } from "../../api/rawmaterial/api";
import Toast from "../../common/Toast";
import { addRawMaterialStock } from "../../api/rawmaterial-stock/api";

const RawMaterialStockAdd = ({ setStockList, stockList }) => {
  const [productName, setProductName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [errors, setErrors] = useState({});

  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productNameOptions, setProductNameOptions] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const validateForm = () => {
    let errors = {};

    if (!productName) errors.productName = "Product Name is required";
    if (!supplier) errors.supplier = "Supplier is required";
    if (!quantity || isNaN(quantity) || quantity <= 0)
      errors.quantity = "Quantity must be a positive number";
    if (!date) errors.date = "Date is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();

        setToast({
          open: true,
          severity: "success",
          message: "Suppliers fetched successfully",
        });

        setSupplierOptions(Array.isArray(response) ? response : []);
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
                "Failed to fetch suppliers",
        });
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await getRawMaterials();

        setToast({
          open: true,
          severity: "success",
          message: "Raw materials fetched successfully",
        });

        setProductNameOptions(
          Array.isArray(response.data) ? response.data : []
        );
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
                "Failed to fetch raw materials",
        });
      }
    };
    fetchRawMaterials();
  }, []);

  const handleAddToList = () => {
    if (!validateForm()) return;

    const selectedProduct = productNameOptions.find(
      (product) => product.rawName === productName
    );

    const selectedSupplier = supplierOptions.find(
      (sup) => sup.supplierName === supplier
    );

    const stock = {
      productName: selectedProduct.rawName,
      productId: selectedProduct.rawId,
      supplier: selectedSupplier.supplierName,
      supplierId: selectedSupplier.supplierId,
      description: description,
      quantity: quantity,
      date: date ? date.toDate() : null, // Convert Dayjs object to JavaScript Date object
    };

    setStockList([...stockList, stock]);

    setProductName("");
    setSupplier("");
    setQuantity("");
    setDescription("");
    setDate(null);
    setErrors({});
  };

  const handlePublish = () => {
    console.log(stockList);
    const handlePublish = async () => {
      if (stockList.length === 0) {
        setToast({
          open: true,
          severity: "error",
          message: "No items to publish",
        });
        return;
      }

      try {
        await addRawMaterialStock(stockList);
        setToast({
          open: true,
          severity: "success",
          message: "Stock added successfully",
        });
        setStockList([]);
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message:
            error.response?.data && typeof error.response.data === "object"
              ? error.response.data.errorMessage ||
                JSON.stringify(error.response.data)
              : error.response?.data || error.message || "Failed to add stock",
        });
      }
    };

    handlePublish();
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
          Add to Main Stock
        </Button>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <div className="w-4/5">
          <div>
            <FormControl fullWidth error={!!errors.productName}>
              <Autocomplete
                options={
                  Array.isArray(productNameOptions) ? productNameOptions : []
                }
                getOptionLabel={(option) => option.rawName}
                onChange={(event, value) => {
                  const productName = value ? value.rawName : "";
                  setProductName(productName);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Product Name"
                    variant="outlined"
                  />
                )}
              />
              {errors.productName && (
                <FormHelperText>{errors.productName}</FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="mt-5">
            <FormControl fullWidth error={!!errors.supplier}>
              <Autocomplete
                options={Array.isArray(supplierOptions) ? supplierOptions : []}
                getOptionLabel={(option) => option.supplierName}
                onChange={(event, value) => {
                  const supplierName = value ? value.supplierName : "";
                  setSupplier(supplierName);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Supplier"
                    variant="outlined"
                  />
                )}
              />
              {errors.supplier && (
                <FormHelperText>{errors.supplier}</FormHelperText>
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
      <Toast
        open={toast.open}
        handleClose={handleCloseToast}
        severity={toast.severity}
        message={toast.message}
      />
    </div>
  );
};

RawMaterialStockAdd.propTypes = {
  setStockList: PropTypes.func.isRequired,
  stockList: PropTypes.array.isRequired,
};

export default RawMaterialStockAdd;
