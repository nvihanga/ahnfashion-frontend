


// import {
//   Button,
//   FormControl,
//   InputLabel,
//   TextField,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Box,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import FinishedGoodStockAddRecheckingList from "./finishedGoodStockAddRecheckingList";

// const FinishedGoodStockAdd = () => {
//   const [productName, setProductName] = useState("");
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [date, setDate] = useState("");
//   const [open, setOpen] = useState(false);
//   const [sizes, setSizes] = useState({ M: "", L: "", XL: "", XXL: "" });
//   const [productData, setProductData] = useState([]);
//   const [descriptions, setDescriptions] = useState([]);
//   const [stockList, setStockList] = useState([]); // State for storing added data

//   useEffect(() => {
//     axios
//       .get("http://localhost:8085/api/v1/finishedGood/all")
//       .then((response) => {
//         console.log("Fetched Data:", response.data);
//         setProductData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching product data:", error);
//       });
//   }, []);

//   const handleProductChange = (selectedProduct) => {
//     setProductName(selectedProduct);
//     setDescription("");

//     const filteredDescriptions = productData
//       .filter((item) => item.finishName === selectedProduct)
//       .map((item) => item.finishDescription);

//     setDescriptions(filteredDescriptions);
//   };

//   const handleSizeChange = (size, value) => {
//     setSizes((prevSizes) => ({ ...prevSizes, [size]: value }));
//   };

//   const handleOpenDialog = () => {
//     setOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setOpen(false);
//   };

//   const handleSubmitSizes = () => {
//     const total = Object.values(sizes).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
//     setQuantity(total);
//     setOpen(false);
//   };

//   const handleAddToList = () => {
//     if (!productName || !description || !quantity || !date) {
//       alert("Please fill all fields before adding to the list.");
//       return;
//     }

//     const newEntry = { productName, description, quantity, date };
//     setStockList([...stockList, newEntry]);

//     // Reset form fields
//     setProductName("");
//     setDescription("");
//     setQuantity("");
//     setDate("");
//     setSizes({ M: "", L: "", XL: "", XXL: "" });
//   };

//   return (
//     <Box className="w-full" p={2}>
//       <Box display="flex" justifyContent="space-between" mb={3}>
//         <h1>Finished Good Stock Add</h1>
//         <Button variant="contained">Publish</Button>
//       </Box>
//       <Box display="flex" justifyContent="space-between" mt={3}>
//         <Box width="80%">
//           {/* Product Name Dropdown */}
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="product_name_label">Product Name</InputLabel>
//             <Select
//               labelId="product_name_label"
//               id="product_name"
//               value={productName}
//               onChange={(e) => handleProductChange(e.target.value)}
//             >
//               {productData.length > 0 ? (
//                 [...new Set(productData.map((product) => product.finishName))].map((name, index) => (
//                   <MenuItem key={index} value={name}>
//                     {name}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No products available</MenuItem>
//               )}
//             </Select>
//           </FormControl>

//           {/* Description Dropdown */}
//           <FormControl fullWidth sx={{ mt: 2 }} disabled={!productName}>
//             <InputLabel id="description_label">Description</InputLabel>
//             <Select
//               labelId="description_label"
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             >
//               {descriptions.length > 0 ? (
//                 descriptions.map((desc, index) => (
//                   <MenuItem key={index} value={desc}>
//                     {desc}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No descriptions available</MenuItem>
//               )}
//             </Select>
//           </FormControl>

//           {/* Quantity Input */}
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <TextField
//               id="quantity"
//               label="Quantity"
//               variant="outlined"
//               value={quantity}
//               onClick={handleOpenDialog}
//               readOnly
//             />
//           </FormControl>

//           {/* Date Input */}
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <TextField
//               id="date"
//               label="Date"
//               type="date"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </FormControl>
//         </Box>
//         <Box display="flex" alignItems="flex-end">
//           <Button variant="contained" onClick={handleAddToList}>ADD TO LIST</Button>
//         </Box>
//       </Box>

//       {/* Size Dialog */}
//       <Dialog open={open} onClose={handleCloseDialog}>
//         <DialogTitle>Enter Quantity for Sizes</DialogTitle>
//         <DialogContent>
//           {Object.keys(sizes).map((size) => (
//             <FormControl fullWidth key={size} sx={{ mt: 2 }}>
//               <TextField
//                 label={size}
//                 type="number"
//                 variant="outlined"
//                 value={sizes[size]}
//                 onChange={(e) => handleSizeChange(size, e.target.value)}
//               />
//             </FormControl>
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleSubmitSizes} variant="contained">Submit</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Display the added data in the table */}
//       <FinishedGoodStockAddRecheckingList stockList={stockList} />
//     </Box>
//   );
// };

// export default FinishedGoodStockAdd;


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
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import FinishedGoodStockAddRecheckingList from "./finishedGoodStockAddRecheckingList";

const FinishedGoodStockAdd = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState({ M: "", L: "", XL: "", XXL: "" });
  const [productData, setProductData] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [stockList, setStockList] = useState([]); // Ensure this is initialized

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

  const handleSizeChange = (size, value) => {
    setSizes((prevSizes) => ({ ...prevSizes, [size]: value }));
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
    setSizes({ M: "", L: "", XL: "", XXL: "" });
  };

  return (
    <Box className="w-full" p={2}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <h1>Finished Good Stock Add</h1>
        <Button variant="contained">Publish</Button>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box width="80%">
          {/* Product Name Dropdown */}
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

          {/* Description Dropdown */}
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

          {/* Quantity Input */}
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

          {/* Date Input */}
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

      {/* Size Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Enter Quantity for Sizes</DialogTitle>
        <DialogContent>
          {Object.keys(sizes).map((size) => (
            <FormControl fullWidth key={size} sx={{ mt: 2 }}>
              <TextField
                label={size}
                type="number"
                variant="outlined"
                value={sizes[size]}
                onChange={(e) => handleSizeChange(size, e.target.value)}
              />
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitSizes} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Display the added data in the table */}
      <FinishedGoodStockAddRecheckingList stockList={stockList || []} />
    </Box>
  );
};

export default FinishedGoodStockAdd;
