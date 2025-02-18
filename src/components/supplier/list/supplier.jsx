

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
  Button,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import EditDrawer from "./editDrawer";
import { useState, useEffect } from "react";
import axios from "axios";

const SupplierList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewDetails, setViewDetails] = useState(false);  // To manage view toggle

  // Fetch data from the backend
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8085/api/v1/supplier/all");
      setSuppliers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setError("Failed to fetch suppliers");
      setLoading(false);
    }
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setDrawerOpen(true);
  };

  const handleDeleteClick = async (supplierId) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      await axios.delete(`http://localhost:8085/api/v1/supplier/delete/${supplierId}`);
      setSuppliers(suppliers.filter((supplier) => supplier.supplierId !== supplierId));
    } catch (error) {
      console.error("Error deleting supplier:", error);
      alert("Failed to delete supplier");
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedSupplier(null);
  };

  const handleSave = async (updatedSupplier) => {
    try {
      await axios.put(`http://localhost:8085/api/v1/supplier/update/${updatedSupplier.supplierId}`, updatedSupplier);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) => (supplier.supplierId === updatedSupplier.supplierId ? updatedSupplier : supplier))
      );
      setDrawerOpen(false);
    } catch (error) {
      console.error("Error updating supplier:", error);
      alert("Failed to update supplier");
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(search.toLowerCase()) ||
    supplier.supplierCode.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (supplier) => {
    setSelectedSupplier(supplier);
    setViewDetails(true);
  };

  const handleBackClick = () => {
    setViewDetails(false);
    setSelectedSupplier(null);
  };

  return (
    <div className="p-6">
      {!viewDetails && (
        <>
          <Typography variant="h5" gutterBottom>
            Supplier List
          </Typography>

          <TextField
            id="search"
            label="Search Suppliers"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            fullWidth
            margin="normal"
          />
        </>
      )}

      {loading ? (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {viewDetails && selectedSupplier ? (
            <div className="p-4">
              <Button variant="contained" color="primary" onClick={handleBackClick}>
                Back to List
              </Button>
              <Typography variant="h5" className="mt-4">
                Supplier Details
              </Typography>
              <TableContainer component={Paper} className="mt-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><b>Supplier Code</b></TableCell>
                      <TableCell>{selectedSupplier.supplierCode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell>{selectedSupplier.supplierName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Email</b></TableCell>
                      <TableCell>{selectedSupplier.supplierEmail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Phone Number</b></TableCell>
                      <TableCell>{selectedSupplier.supplierPhoneNo.join(", ")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Address</b></TableCell>
                      <TableCell>{selectedSupplier.supplierAddress}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><b>Notes</b></TableCell>
                      <TableCell>{selectedSupplier.supplierNote}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <TableContainer component={Paper} elevation={3} className="mt-4">
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell><b>No</b></TableCell>
                    <TableCell><b>Supplier Code</b></TableCell>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Email</b></TableCell>
                    <TableCell><b>Phone Number</b></TableCell>
                    <TableCell align="center"><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSuppliers.map((supplier, index) => (
                    <TableRow
                      key={supplier.supplierId}
                      hover
                      onClick={() => handleRowClick(supplier)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{supplier.supplierCode}</TableCell>
                      <TableCell>{supplier.supplierName}</TableCell>
                      <TableCell>{supplier.supplierEmail}</TableCell>
                      <TableCell>{supplier.supplierPhoneNo.join(", ")}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="info"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(supplier);
                          }}
                        >
                          <MdEdit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(supplier.supplierId);
                          }}
                        >
                          <MdDelete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {selectedSupplier && (
        <EditDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          item={selectedSupplier}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SupplierList;





