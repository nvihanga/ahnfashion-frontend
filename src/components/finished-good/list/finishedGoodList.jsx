// import {
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Paper,
//   Typography,
//   CircularProgress,
//   Grid,
//   Collapse,
//   Box,
// } from "@mui/material";
// import { MdEdit, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
// import EditDrawer from "./editDrawer";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const SIZE_MAPPING = {
//   L: "L",
//   XL: "XL",
//   XXL: "2XL",
//   XXXL: "3XL",
//   XXXXL: "4XL",
//   XXXXXL: "5XL",
// };

// const STANDARD_SIZES = Object.keys(SIZE_MAPPING);

// const FinishedGoodList = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [search, setSearch] = useState("");
//   const [finishedGoods, setFinishedGoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [expandedRow, setExpandedRow] = useState(null);

//   useEffect(() => {
//     fetchFinishedGoods();
//   }, []);

//   const fetchFinishedGoods = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8085/api/v1/finishedGood/all");
      
//       const updatedGoods = response.data.map((good) => ({
//         ...good,
//         finishedGoodVariants: mergeVariants(good.finishedGoodVariants || []),
//       }));
      
//       setFinishedGoods(updatedGoods);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching finished goods:", error);
//       setError("Failed to fetch finished goods");
//       setLoading(false);
//     }
//   };

//   const mergeVariants = (variants) => {
//     const variantMap = new Map(variants.map((v) => [v.size, v]));
//     return STANDARD_SIZES.map((size) =>
//       variantMap.has(size) ? { ...variantMap.get(size), sizeLabel: SIZE_MAPPING[size] } : { size, sizeLabel: SIZE_MAPPING[size], quantityInStock: 0, unitPrice: 0 }
//     );
//   };

//   const calculateTotalVariantQuantity = (variants) => {
//     return variants.reduce((total, variant) => total + (variant.quantityInStock || 0), 0);
//   };

//   const handleEditClick = (item) => {
//     setSelectedItem(item);
//     setDrawerOpen(true);
//   };

//   const handleDeleteClick = async (good) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     try {
//       await axios.delete(`http://localhost:8085/api/v1/finishedGood/delete/${good.finishId}`);
//       setFinishedGoods((prevGoods) => prevGoods.filter((item) => item.finishId !== good.finishId));
//     } catch (error) {
//       console.error("Error deleting finished good:", error);
//       alert("Failed to delete item");
//     }
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//     setSelectedItem(null);
//   };

//   const handleSave = async (updatedItem) => {
//     try {
//       await axios.put(`http://localhost:8085/api/v1/finishedGood/update/${updatedItem.finishId}`, updatedItem);
//       setFinishedGoods((prevGoods) =>
//         prevGoods.map((item) =>
//           item.finishId === updatedItem.finishId ? updatedItem : item
//         )
//       );
//       setDrawerOpen(false);
//     } catch (error) {
//       console.error("Error updating item:", error);
//       alert("Failed to update item");
//     }
//   };

//   // Filter finished goods based on search input
//   const filteredGoods = finishedGoods.filter((good) =>
//     good.finishId.toString().toLowerCase().includes(search) ||
//     good.finishName.toLowerCase().includes(search)
//   );

//   return (
//     <div className="p-6">
//       <Typography variant="h5" gutterBottom>Finished Goods Inventory</Typography>
//       <TextField 
//         label="Search" 
//         variant="outlined" 
//         value={search} 
//         onChange={(e) => setSearch(e.target.value.toLowerCase())} 
//         fullWidth 
//         margin="normal" 
//         placeholder="Search by Style Number or Name"
//       />

//       {loading ? <CircularProgress /> : error ? <Typography color="error">{error}</Typography> : (
//         <TableContainer component={Paper} elevation={3} className="mt-4">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell></TableCell>
//                 <TableCell><b>STYLE NUMBER</b></TableCell>
//                 <TableCell><b>NAME</b></TableCell>
//                 <TableCell><b>DESCRIPTION</b></TableCell>
//                 <TableCell><b>TOTAL QUANTITY</b></TableCell>
//                 <TableCell align="center"><b>ACTION</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredGoods.map((good) => (
//                 <>
//                   <TableRow key={good.finishId} onClick={() => setExpandedRow(expandedRow === good.finishId ? null : good.finishId)}>
//                     <TableCell>{expandedRow === good.finishId ? <MdExpandLess /> : <MdExpandMore />}</TableCell>
//                     <TableCell>{good.finishId}</TableCell>
//                     <TableCell>{good.finishName}</TableCell>
//                     <TableCell>{good.finishDescription}</TableCell>
//                     <TableCell>{calculateTotalVariantQuantity(good.finishedGoodVariants)}</TableCell>
//                     <TableCell>
//                       <IconButton color="info" onClick={() => handleEditClick(good)}><MdEdit /></IconButton>
//                       <IconButton color="error" onClick={() => handleDeleteClick(good)}><MdDelete /></IconButton>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell colSpan={6} style={{ padding: 0 }}>
//                       <Collapse in={expandedRow === good.finishId} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                           <Typography variant="h6">Variant Details</Typography>
//                           <Table size="small">
//                             <TableBody>
//                               {good.finishedGoodVariants.map((variant) => (
//                                 <TableRow key={variant.size}>
//                                   <TableCell>{variant.sizeLabel}</TableCell>
//                                   <TableCell>{variant.quantityInStock}</TableCell>
//                                   <TableCell>Rs. {variant.unitPrice.toFixed(2)}</TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </Box>
//                       </Collapse>
//                     </TableCell>
//                   </TableRow>
//                 </>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {selectedItem && <EditDrawer open={drawerOpen} onClose={handleDrawerClose} item={selectedItem} onSave={handleSave} />}
//     </div>
//   );
// };

// export default FinishedGoodList;

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Collapse,
  Box,
} from "@mui/material";
import { MdEdit, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EditDrawer from "./editDrawer";
import { useState, useEffect } from "react";
import axios from "axios";

const SIZE_MAPPING = {
  L: "L",
  XL: "XL",
  XXL: "2XL",
  XXXL: "3XL",
  XXXXL: "4XL",
  XXXXXL: "5XL",
};

const STANDARD_SIZES = Object.keys(SIZE_MAPPING);

const FinishedGoodList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [finishedGoods, setFinishedGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchFinishedGoods();
  }, []);

  const fetchFinishedGoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8085/api/v1/finishedGood/all");
      
      const updatedGoods = response.data.map((good) => ({
        ...good,
        finishedGoodVariants: mergeVariants(good.finishedGoodVariants || []),
      }));
      
      setFinishedGoods(updatedGoods);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching finished goods:", error);
      setError("Failed to fetch finished goods");
      setLoading(false);
    }
  };

  const mergeVariants = (variants) => {
    const variantMap = new Map(variants.map((v) => [v.size, v]));
    return STANDARD_SIZES.map((size) =>
      variantMap.has(size) ? { ...variantMap.get(size), sizeLabel: SIZE_MAPPING[size] } : { size, sizeLabel: SIZE_MAPPING[size], quantityInStock: 0, unitPrice: 0 }
    );
  };

  const calculateTotalVariantQuantity = (variants) => {
    return variants.reduce((total, variant) => total + (variant.quantityInStock || 0), 0);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleDeleteClick = async (good) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:8085/api/v1/finishedGood/delete/${good.finishId}`);
      setFinishedGoods((prevGoods) => prevGoods.filter((item) => item.finishId !== good.finishId));
    } catch (error) {
      console.error("Error deleting finished good:", error);
      alert("Failed to delete item");
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:8085/api/v1/finishedGood/update/${updatedItem.finishId}`, updatedItem);
      setFinishedGoods((prevGoods) =>
        prevGoods.map((item) =>
          item.finishId === updatedItem.finishId ? updatedItem : item
        )
      );
      setDrawerOpen(false);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item");
    }
  };

  // Filter and pagination logic
  const filteredGoods = finishedGoods.filter((good) =>
    good.finishId.toString().toLowerCase().includes(search) ||
    good.finishName.toLowerCase().includes(search)
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedGoods = filteredGoods.slice(startIndex, endIndex);

  const calculatePaginationDisplay = () => {
    if (filteredGoods.length === 0) return '0-0 of 0';
    const start = startIndex + 1;
    const end = Math.min(endIndex, filteredGoods.length);
    return `${start}-${end} of ${filteredGoods.length}`;
  };

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNextPage = () => endIndex < filteredGoods.length && setCurrentPage(p => p + 1);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="p-6">
      <Typography variant="h5" gutterBottom>Finished Goods Inventory</Typography>
      <TextField 
        label="Search" 
        variant="outlined" 
        value={search} 
        onChange={handleSearch}
        fullWidth 
        margin="normal" 
        placeholder="Search by Style Number or Name"
      />

      {loading ? <CircularProgress /> : error ? <Typography color="error">{error}</Typography> : (
        <>
          <TableContainer component={Paper} elevation={3} className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell><b>STYLE NUMBER</b></TableCell>
                  <TableCell><b>NAME</b></TableCell>
                  <TableCell><b>DESCRIPTION</b></TableCell>
                  <TableCell><b>TOTAL QUANTITY</b></TableCell>
                  <TableCell align="center"><b>ACTION</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedGoods.map((good) => (
                  <>
                    <TableRow key={good.finishId} onClick={() => setExpandedRow(expandedRow === good.finishId ? null : good.finishId)}>
                      <TableCell>{expandedRow === good.finishId ? <MdExpandLess /> : <MdExpandMore />}</TableCell>
                      <TableCell>{good.finishId}</TableCell>
                      <TableCell>{good.finishName}</TableCell>
                      <TableCell>{good.finishDescription}</TableCell>
                      <TableCell>{calculateTotalVariantQuantity(good.finishedGoodVariants)}</TableCell>
                      <TableCell>
                        <IconButton color="info" onClick={(e) => {e.stopPropagation(); handleEditClick(good)}}><MdEdit /></IconButton>
                        <IconButton color="error" onClick={(e) => {e.stopPropagation(); handleDeleteClick(good)}}><MdDelete /></IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6} style={{ padding: 0 }}>
                        <Collapse in={expandedRow === good.finishId} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="h6">Variant Details</Typography>
                            <Table size="small">
                              <TableBody>
                                {good.finishedGoodVariants.map((variant) => (
                                  <TableRow key={variant.size}>
                                    <TableCell>{variant.sizeLabel}</TableCell>
                                    <TableCell>{variant.quantityInStock}</TableCell>
                                    <TableCell>Rs. {variant.unitPrice.toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <div className="flex items-center gap-2">
              Rows per page:
              <select
                className="border rounded p-1"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {calculatePaginationDisplay()}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleNextPage} 
                  disabled={(currentPage * rowsPerPage) >= filteredGoods.length}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedItem && <EditDrawer open={drawerOpen} onClose={handleDrawerClose} item={selectedItem} onSave={handleSave} />}
    </div>
  );
};

export default FinishedGoodList;