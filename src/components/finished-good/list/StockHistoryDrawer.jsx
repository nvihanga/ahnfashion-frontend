// import {
//   Drawer,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { useState, useEffect } from "react";

// const stockEditDrawer = ({ open, onClose, item, onSave, variant, stockHistory }) => {
//   const [formData, setFormData] = useState(item || {});

//   useEffect(() => {
//     if (item) {
//       setFormData(item);
//     }
//   }, [item]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleVariantChange = (index, field, value) => {
//     const updatedVariants = [...formData.finishedGoodVariants];
//     updatedVariants[index] = { ...updatedVariants[index], [field]: value };
//     setFormData((prev) => ({ ...prev, finishedGoodVariants: updatedVariants }));
//   };

//   const handleSubmit = () => {
//     onSave(formData);
//   };

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose} sx={{ width: 400 }}>
//       <div style={{ width: 400, padding: 20 }}>
//         {variant ? (
//           <>
//             <Typography variant="h6" gutterBottom>
//               Stock History for {variant.sizeLabel} (ID: {variant.variantID})
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><b>Date</b></TableCell>
//                     <TableCell><b>Quantity</b></TableCell>
//                     <TableCell><b>Action</b></TableCell>
//                     <TableCell><b>Remarks</b></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {stockHistory.length > 0 ? (
//                     stockHistory.map((history) => (
//                       <TableRow key={history.id}>
//                         <TableCell>{new Date(history.date).toLocaleString()}</TableCell>
//                         <TableCell>{history.quantity}</TableCell>
//                         <TableCell>{history.action}</TableCell>
//                         <TableCell>{history.remarks || '-'}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={4} align="center">No history available</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </>
//         ) : (
//           <>
//             <Typography variant="h6" gutterBottom>Edit Finished Good</Typography>
//             <TextField
//               label="Style Number"
//               name="finishId"
//               value={formData.finishId || ""}
//               fullWidth
//               margin="normal"
//               disabled
//             />
//             <TextField
//               label="Name"
//               name="finishName"
//               value={formData.finishName || ""}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Description"
//               name="finishDescription"
//               value={formData.finishDescription || ""}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//             <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
//               Variants
//             </Typography>
//             {formData.finishedGoodVariants?.map((variant, index) => (
//               <div key={variant.size} style={{ marginBottom: 16 }}>
//                 <TextField
//                   label={`Size ${variant.sizeLabel}`}
//                   value={variant.sizeLabel}
//                   fullWidth
//                   margin="normal"
//                   disabled
//                 />
//                 <TextField
//                   label="Quantity"
//                   type="number"
//                   value={variant.quantityInStock}
//                   onChange={(e) => handleVariantChange(index, "quantityInStock", parseInt(e.target.value))}
//                   fullWidth
//                   margin="normal"
//                 />
//                 <TextField
//                   label="Unit Price"
//                   type="number"
//                   value={variant.unitPrice}
//                   onChange={(e) => handleVariantChange(index, "unitPrice", parseFloat(e.target.value))}
//                   fullWidth
//                   margin="normal"
//                 />
//               </div>
//             ))}
//             <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
//               Save
//             </Button>
//           </>
//         )}
//         <Button variant="outlined" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
//           Close
//         </Button>
//       </div>
//     </Drawer>
//   );
// };

// export default stockEditDrawer;

import {
  Drawer,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const StockEditDrawer = ({ open, onClose, variant }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open && variant) {
      fetchHistory();
    }
  }, [open, variant]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8085/api/v1/finishedGood/stock-history/${variant.variantID}`
      );
      setHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching stock history:", error);
    }
    setLoading(false);
  };

  const handleAddStock = async () => {
    if (!quantity || quantity <= 0) return;
    try {
      await axios.post("http://localhost:8085/api/v1/finishedGood/stock/add", {
        variantId: variant.variantID,
        quantity: quantity.toString(),
        description,
        date: new Date().toString(),
      });
      setQuantity("");
      setDescription("");
      fetchHistory();
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  const handleRemoveStock = async () => {
    if (!quantity || quantity <= 0) return;
    try {
      await axios.post("http://localhost:8085/api/v1/finishedGood/stock/remove", {
        variantId: variant.variantID,
        quantity: quantity.toString(),
        description,
      });
      setQuantity("");
      setDescription("");
      fetchHistory();
    } catch (error) {
      console.error("Error removing stock:", error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 500, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Stock History - {variant?.finishedGood.finishName} ({variant?.sizeLabel})
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStock}
              sx={{ mr: 1 }}
            >
              Add Stock
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleRemoveStock}
            >
              Remove Stock
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : (
                history.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
                    <TableCell>{entry.quantity}</TableCell>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell>{entry.remarks}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Drawer>
  );
};

export default StockEditDrawer;