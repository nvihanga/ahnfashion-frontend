import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import FinishedGoodStockAddRecheckingList from "./finishedGoodStockAddRecheckingList";

const SIZE_MAPPING = {
  L: "L",
  XL: "XL",
  XXL: "2XL",
  XXXL: "3XL",
  XXXXL: "4XL",
  XXXXXL: "5XL",
};

const STANDARD_SIZES = Object.keys(SIZE_MAPPING);

const FinishedGoodStockAdd = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState(
    STANDARD_SIZES.reduce((acc, size) => ({ ...acc, [SIZE_MAPPING[size]]: "" }), {})
  );
  const [productData, setProductData] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [stockList, setStockList] = useState([]);
  
  // New state variables for confirmation dialog and success message
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/v1/finishedGood/all")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setProductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const handleProductChange = (selectedProduct) => {
    setProductName(selectedProduct);
    setDescription("");

    const filteredDescriptions = productData
      .filter((item) => item.finishName === selectedProduct)
      .map((item) => item.finishDescription);

    setDescriptions(filteredDescriptions);
  };

  const handleSizeChange = (displaySize, value) => {
    setSizes((prevSizes) => ({ ...prevSizes, [displaySize]: value }));
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmitSizes = () => {
    const total = Object.values(sizes).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
    setQuantity(total);
    setOpen(false);
  };

  const handleAddToList = () => {
    if (!productName || !description || !quantity || !date) {
      alert("Please fill all fields before adding to the list.");
      return;
    }

    const newEntry = { productName, description, quantity, date, sizes };
    setStockList([...stockList, newEntry]);

    // Reset form fields
    setProductName("");
    setDescription("");
    setQuantity("");
    setDate("");
    setSizes(STANDARD_SIZES.reduce((acc, size) => ({ ...acc, [SIZE_MAPPING[size]]: "" }), {}));
  };

  // Updated handlePublish to open confirmation dialog first
  const handlePublishRequest = () => {
    if (stockList.length === 0) {
      alert("No items in the stock list to publish.");
      return;
    }
    
    // Open confirmation dialog
    setConfirmDialogOpen(true);
  };
  
  // Actual publish function that runs after confirmation
  const handlePublish = async () => {
    // Close the confirmation dialog
    setConfirmDialogOpen(false);
    
    try {
      for (const entry of stockList) {
        const finishedGood = productData.find(
          (item) => item.finishName === entry.productName && item.finishDescription === entry.description
        );
  
        if (!finishedGood || !finishedGood.finishId) {
          alert(`Could not find finished good: ${entry.productName} - ${entry.description}`);
          continue;
        }
  
        const reverseSizeMapping = Object.fromEntries(
          Object.entries(SIZE_MAPPING).map(([backend, frontend]) => [frontend, backend])
        );
        const backendSizes = Object.fromEntries(
          Object.entries(entry.sizes).map(([frontendSize, qty]) => [reverseSizeMapping[frontendSize], qty])
        );
  
        const updatedVariants = finishedGood.finishedGoodVariants.map((variant) => {
          const newQuantity = parseInt(backendSizes[variant.size] || 0);
          return {
            size: variant.size,
            quantityInStock: variant.quantityInStock + newQuantity,
            unitPrice: variant.unitPrice,
            receivedDate: entry.date,
          };
        });
  
        Object.entries(backendSizes).forEach(([size, qty]) => {
          if (qty && !updatedVariants.some((v) => v.size === size)) {
            updatedVariants.push({
              size: size,
              quantityInStock: parseInt(qty),
              unitPrice: 0,
              receivedDate: entry.date,
            });
          }
        });
  
        const updatedData = {
          finishName: entry.productName,
          finishDescription: entry.description,
          finishedGoodVariants: updatedVariants,
        };
  
        const response = await axios.put(
          `http://localhost:8085/api/v1/finishedGood/update/${finishedGood.finishId}`,
          updatedData
        );
  
        if (response.status === 200 || response.status === 201) {
          console.log(`Successfully updated ${entry.productName} - ${entry.description}`);
        }
      }
  
      // Show success message using Snackbar instead of alert
      setSuccessSnackbarOpen(true);
      
      // Clear the stockList
      setStockList([]);
      
      // Refresh product data
      const refreshedData = await axios.get("http://localhost:8085/api/v1/finishedGood/all");
      setProductData(refreshedData.data);
    } catch (error) {
      console.error("Error publishing stock:", error);
      alert("Error publishing stock: " + (error.response?.data?.message || error.message));
    }
  };
  
  const handleRemove = (index) => {
    setStockList(stockList.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const itemToEdit = stockList[index];
    setProductName(itemToEdit.productName);
    setDescription(itemToEdit.description);
    setQuantity(itemToEdit.quantity);
    setDate(itemToEdit.date);
    setSizes(itemToEdit.sizes);
    setStockList(stockList.filter((_, i) => i !== index));
  };

  return (
    <Box className="w-full" p={2}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <h1>Finished Good Stock Add</h1>
        <Button variant="contained" onClick={handlePublishRequest}>
          Publish
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box width="80%">
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="product_name_label">Product Name</InputLabel>
            <Select
              labelId="product_name_label"
              id="product_name"
              value={productName}
              onChange={(e) => handleProductChange(e.target.value)}
            >
              {productData.length > 0 ? (
                [...new Set(productData.map((product) => product.finishName))].map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No products available</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }} disabled={!productName}>
            <InputLabel id="description_label">Description</InputLabel>
            <Select
              labelId="description_label"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              {descriptions.length > 0 ? (
                descriptions.map((desc, index) => (
                  <MenuItem key={index} value={desc}>
                    {desc}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No descriptions available</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              id="quantity"
              label="Quantity"
              variant="outlined"
              value={quantity}
              onClick={handleOpenDialog}
              readOnly
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              id="date"
              label="Date"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box display="flex" alignItems="flex-end">
          <Button variant="contained" onClick={handleAddToList}>ADD TO LIST</Button>
        </Box>
      </Box>

      {/* Size input dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Enter Quantity for Sizes</DialogTitle>
        <DialogContent>
          {Object.keys(sizes).map((displaySize) => (
            <FormControl fullWidth key={displaySize} sx={{ mt: 2 }}>
              <TextField
                label={displaySize}
                type="number"
                variant="outlined"
                value={sizes[displaySize]}
                onChange={(e) => handleSizeChange(displaySize, e.target.value)}
                inputProps={{ min: 0 }}
              />
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitSizes} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Confirmation dialog before publishing */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Confirm Publication</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            Please verify all stock details before publishing. This action will update the inventory system.
          </Alert>
          <Box mt={3}>
            <h3>You are about to publish the following items:</h3>
            <Box sx={{ maxHeight: '300px', overflow: 'auto', mt: 2 }}>
              {stockList.map((item, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <h4>{item.productName} - {item.description}</h4>
                  <p><strong>Total Quantity:</strong> {item.quantity}</p>
                  <p><strong>Date:</strong> {item.date}</p>
                  <p><strong>Size Breakdown:</strong></p>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {Object.entries(item.sizes).map(([size, qty]) => 
                      qty && parseInt(qty) > 0 ? (
                        <Box key={size} sx={{ 
                          bgcolor: '#f5f5f5', 
                          p: 1, 
                          borderRadius: 1,
                          minWidth: '80px',
                          textAlign: 'center'
                        }}>
                          {size}: {qty}
                        </Box>
                      ) : null
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePublish} variant="contained" color="primary">
            Confirm Publish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success message Snackbar */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSuccessSnackbarOpen(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Stock successfully published!
        </Alert>
      </Snackbar>

      <FinishedGoodStockAddRecheckingList
        stockList={stockList || []}
        onRemove={handleRemove}
        onEdit={handleEdit}
      />
    </Box>
  );
};

export default FinishedGoodStockAdd;