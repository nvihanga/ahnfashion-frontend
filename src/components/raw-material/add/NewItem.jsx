import {
  Button,
  FormControl,
  TextField,
  Autocomplete,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { 
  addRawMaterial,
  getRawMaterialTypes,
  getSuppliers,
  getRawMaterials,
  editRawMaterial,
  deleteRawMaterial
} from '../../api/rawmaterial/api';
import Toast from "../../common/Toast";

const NewItem = () => {
  //const [product, setProduct] = useState({});
  const [errors, setErrors] = useState({});
  const [rawTypes, setRawTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [product, setProduct] = useState({
    productName: "",
    productType: "",
    quantity: "",
    supplier: "",
    price: "",
    minimumStockLevel: "",
    description: "",
  });

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetcRawTypes = async () => {
      try {
        const response = await getRawMaterialTypes();
        setToast({
          open: true,
          severity: "success",
          message: "Raw material types fetched successfully",
        });
        setRawTypes(response.data);
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
                "Failed to fetch raw material types",
        });
      }
    };
    fetcRawTypes();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        setToast({
          open: true,
          severity: "success",
          message: "Suppliers fetched successfully",
        });
        setSuppliers(response);
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
    if (
      !product.minimumStockLevel ||
      isNaN(product.minimumStockLevel) ||
      product.minimumStockLevel < 0
    )
      errors.minimumStockLevel =
        "Minimum Stock Level must be a non-negative number";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddNewItem = async () => {
    if (!validateForm()) return;

    try {
      await addRawMaterial(product);
      setToast({
        open: true,
        severity: "success",
        message: "Raw material added successfully",
      });
      // Reset all form fields
      setProduct({
        productName: "",
        productType: "",
        quantity: "",
        supplier: "",
        price: "",
        minimumStockLevel: "",
        description: "",
      });
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message:
          error.response?.data?.errorMessage ||
          error.message ||
          "Failed to add raw material",
      });
    }
  };

  const handleReset = () => {
    // Reset all form fields
    setProduct({
      productName: "",
      productType: "",
      quantity: "",
      supplier: "",
      price: "",
      minimumStockLevel: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="w-full mt-10 px-10">
      <div className="flex flex-row justify-between gap-5">
        <h1 className="font-bold">Add New Item</h1>
        <div className="flex gap-5">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddNewItem}
            aria-label="Submit form"
          >
            Save
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
          <Autocomplete
            options={rawTypes}
            getOptionLabel={(option) => option.rawTypeName}
            value={rawTypes.find(
              (type) => type.rawTypeId === product.productType
            ) || null}
            onChange={(event, newValue) => {
              setProduct((prev) => ({
                ...prev,
                productType: newValue ? newValue.rawTypeId : "",
              }));
              if (errors.productType) {
                setErrors((prevErrors) => ({ ...prevErrors, productType: "" }));
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product Type"
                placeholder="Select Product Type"
                variant="outlined"
                error={!!errors.productType}
                helperText={errors.productType}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body1">{option.rawTypeName}</Typography>
                </Box>
              </Box>
            )}
          />
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
          <Autocomplete
            options={suppliers || []}
            getOptionLabel={(option) => option.supplierName}
            value={suppliers.find(
              (type) => type.supplierId === product.supplier
            ) || null}
            onChange={(event, newValue) => {
              setProduct((prev) => ({
                ...prev,
                supplier: newValue ? newValue.supplierId : "",
              }));
              if (errors.supplier) {
                setErrors((prevErrors) => ({ ...prevErrors, supplier: "" }));
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Supplier"
                placeholder="Select Supplier"
                variant="outlined"
                error={!!errors.supplier}
                helperText={errors.supplier}
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body1">{option.supplierName}</Typography>
                </Box>
              </Box>
            )}
          />
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
      <div className="mt-5">
        <TextField
          name="minimumStockLevel"
          label="Minimum Stock Level"
          type="number"
          variant="outlined"
          fullWidth
          value={product.minimumStockLevel}
          onChange={handleChange}
          error={!!errors.minimumStockLevel}
          helperText={errors.minimumStockLevel}
        />
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

export default NewItem;
