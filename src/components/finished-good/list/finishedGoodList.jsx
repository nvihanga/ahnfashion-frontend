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
import EditDrawer from "./editDrawer";
import { useState, useEffect } from "react";
import axios from "axios";

const FinishedGoodList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [finishedGoods, setFinishedGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchFinishedGoods();
  }, []);

  const fetchFinishedGoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8085/api/v1/finishedGood/all");
      setFinishedGoods(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching finished goods:", error);
      setError("Failed to fetch finished goods");
      setLoading(false);
    }
  };

  const calculateTotalVariantQuantity = (variants) => {
    if (!variants) return 0;
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
      const requestBody = {
        finishName: updatedItem.finishName,
        finishDescription: updatedItem.finishDescription,
        finishedGoodVariants: updatedItem.finishedGoodVariants.map(variant => ({
          size: variant.size,
          quantityInStock: Number(variant.quantityInStock),
          unitPrice: Number(variant.unitPrice)
        }))
      };

      await axios.put(
        `http://localhost:8085/api/v1/finishedGood/update/${updatedItem.finishId}`,
        requestBody
      );

      setFinishedGoods(prevGoods =>
        prevGoods.map(item =>
          item.finishId === updatedItem.finishId ? 
          { ...item, ...requestBody, finishedGoodVariants: updatedItem.finishedGoodVariants } : 
          item
        )
      );
      setDrawerOpen(false);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item");
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleRowExpand = (finishId) => {
    setExpandedRow(expandedRow === finishId ? null : finishId);
  };

  const filteredGoods = finishedGoods.filter(
    (item) =>
      item.finishName.toLowerCase().includes(search) ||
      item.finishId.toString().toLowerCase().includes(search)
  );

  return (
    <div className="p-6">
      <Typography variant="h5" gutterBottom className="text-center md:text-left">
        Finished Goods Inventory
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            id="search"
            label="Search by Style Number or Name"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      {loading ? (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div className="overflow-x-auto">
          <TableContainer component={Paper} elevation={3} className="mt-4">
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell></TableCell>
                  {/* <TableCell><b>NO</b></TableCell> */}
                  <TableCell><b>STYLE NUMBER</b></TableCell>
                  <TableCell><b>NAME</b></TableCell>
                  <TableCell><b>DESCRIPTION</b></TableCell>
                  <TableCell><b>TOTAL QUANTITY</b></TableCell>
                  <TableCell align="center"><b>ACTION</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGoods.map((good, index) => {
                  const totalQuantity = calculateTotalVariantQuantity(good.finishedGoodVariants);
                  
                  return (
                    <>
                      <TableRow 
                        key={good.finishId} 
                        hover 
                        onClick={() => handleRowExpand(good.finishId)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          {expandedRow === good.finishId ? <MdExpandLess /> : <MdExpandMore />}
                        </TableCell>
                        {/* <TableCell>{index + 1}</TableCell> */}
                        <TableCell>{good.finishId}</TableCell>
                        <TableCell>{good.finishName}</TableCell>
                        <TableCell>{good.finishDescription}</TableCell>
                        <TableCell>{totalQuantity}</TableCell>
                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center space-x-2">
                            <IconButton 
                              color="info" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(good);
                              }}
                            >
                              <MdEdit />
                            </IconButton>
                            <IconButton 
                              color="error" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(good);
                              }}
                            >
                              <MdDelete />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell style={{ padding: 0 }} colSpan={7}>
                          <Collapse in={expandedRow === good.finishId} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1, backgroundColor: '#f8f9fa' }}>
                              <Typography variant="h6" gutterBottom component="div">
                                Variant Details
                              </Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell><b>Size</b></TableCell>
                                    <TableCell><b>Quantity</b></TableCell>
                                    <TableCell><b>Unit Price</b></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {good.finishedGoodVariants && good.finishedGoodVariants.length > 0 ? (
                                    good.finishedGoodVariants.map((variant) => (
                                      <TableRow key={variant.variantID}>
                                        <TableCell>{variant.size}</TableCell>
                                        <TableCell>{variant.quantityInStock}</TableCell>
                                        <TableCell>Rs. {variant.unitPrice?.toFixed(2)}</TableCell>
                                      </TableRow>
                                    ))
                                  ) : (
                                    <TableRow>
                                      <TableCell colSpan={3} align="center">
                                        No variants available
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {selectedItem && (
        <EditDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          item={selectedItem}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default FinishedGoodList;