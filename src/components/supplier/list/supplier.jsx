import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EditDrawer from "./editDrawer";
import { useState, useEffect } from "react";
import axios from "axios";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [search, setSearch] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteSupplierId, setDeleteSupplierId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios
      .get("http://localhost:8085/api/v1/supplier/all")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (supplierId) => {
    setDeleteSupplierId(supplierId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8085/api/v1/supplier/delete/${deleteSupplierId}`)
      .then(() => {
        setSuppliers(suppliers.filter((supplier) => supplier.supplierId !== deleteSupplierId));
        setOpenDeleteDialog(false);
      })
      .catch((error) => {
        console.error("Error deleting supplier:", error);
        setOpenDeleteDialog(false);
      });
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedSupplier(null);
  };

  const handleSave = (updatedSupplier) => {
    axios
      .put(`http://localhost:8085/api/v1/supplier/update/${updatedSupplier.supplierId}`, updatedSupplier)
      .then(() => {
        fetchSuppliers();
        setDrawerOpen(false);
      })
      .catch((error) => {
        console.error("Error updating supplier:", error);
      });
    setSelectedSupplier(null);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleRowClick = (supplier) => {
    setSelectedSupplier(supplier);
    setViewDetails(true);
  };

  const handleBackClick = () => {
    setViewDetails(false);
    setSelectedSupplier(null);
  };

  // Filter and pagination logic
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(search.toLowerCase()) ||
    supplier.supplierCode.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedSuppliers = filteredSuppliers.slice(startIndex, endIndex);

  const calculatePaginationDisplay = () => {
    if (filteredSuppliers.length === 0) return '0-0 of 0';
    const start = startIndex + 1;
    const end = Math.min(endIndex, filteredSuppliers.length);
    return `${start}-${end} of ${filteredSuppliers.length}`;
  };

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNextPage = () => endIndex < filteredSuppliers.length && setCurrentPage(p => p + 1);

  return (
    <>
      {viewDetails && selectedSupplier ? (
        <div className="p-4">
          <Button variant="contained" color="primary" onClick={handleBackClick}>
            Back
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
        <>
          <div className="flex flex-col w-full p-4 border-collapse">
            <h1 className="text-xl">Search</h1>
            <TextField
              id="search"
              label="Search by Name or Supplier Code"
              variant="outlined"
              value={search}
              onChange={handleSearch}
              fullWidth
              margin="normal"
            />
          </div>
          <TableContainer component={Paper} style={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><b>NO</b></TableCell>
                  <TableCell><b>SUPPLIER CODE</b></TableCell>
                  <TableCell><b>NAME</b></TableCell>
                  <TableCell><b>EMAIL</b></TableCell>
                  <TableCell><b>PHONE NUMBER</b></TableCell>
                  <TableCell align="center"><b>ACTION</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedSuppliers.map((supplier, index) => (
                  <TableRow
                    key={supplier.supplierId}
                    hover
                    onClick={() => handleRowClick(supplier)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell>{supplier.supplierCode}</TableCell>
                    <TableCell>{supplier.supplierName}</TableCell>
                    <TableCell>{supplier.supplierEmail}</TableCell>
                    <TableCell>{supplier.supplierPhoneNo.join(", ")}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="info"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSupplier(supplier);
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

          {/* Pagination Component */}
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
                  disabled={(currentPage * rowsPerPage) >= filteredSuppliers.length}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
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

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this supplier?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SupplierList;