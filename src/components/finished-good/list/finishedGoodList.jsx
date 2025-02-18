
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
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
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

  // Fetch data from the backend
  useEffect(() => {
    fetchFinishedGoods();
  }, []);

  const fetchFinishedGoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8085/api/v1/finishedGood/all");
      setFinishedGoods(response.data.map(item => ({
        ...item,
        finishPrice: parseFloat(item.finishPrice) // Ensure it's a number
      })));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching finished goods:", error);
      setError("Failed to fetch finished goods");
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleDeleteClick = async (good) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:8085/api/v1/finishedGood/delete/${good.finishId}`);
      setFinishedGoods(finishedGoods.filter((item) => item.finishId !== good.finishId));
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
        prevGoods.map((item) => (item.finishId === updatedItem.finishId ? updatedItem : item))
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

  const filteredGoods = finishedGoods.filter((item) =>
    item.finishName.toLowerCase().includes(search)
  );

  return (
    <div className="p-6">
      <Typography variant="h5" gutterBottom>
        Finished Goods Inventory
      </Typography>

      <TextField
        id="search"
        label="Search Finished Goods"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

      {loading ? (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} className="mt-4">
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>No</b></TableCell>
                <TableCell><b>Style Number</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Quantity in Stock</b></TableCell>
                <TableCell><b>Unit Price</b></TableCell>
                <TableCell align="center"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGoods.map((good, index) => (
                <TableRow key={good.finishId} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{good.finishItemNo}</TableCell>
                  <TableCell>{good.finishName}</TableCell>
                  <TableCell>{good.finishDescription}</TableCell>
                  <TableCell>{good.finishQuantity}</TableCell>
                  <TableCell>Rs. {good.finishPrice.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton color="info" onClick={() => handleEditClick(good)}>
                      <MdEdit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(good)}>
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

