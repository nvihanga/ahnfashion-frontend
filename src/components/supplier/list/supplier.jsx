
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,gi,
  TextField,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import EditDrawer from "./editDrawer";
import { useState, useEffect } from "react";
import axios from "axios";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [search, setSearch] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens
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
    axios
      .delete(`http://localhost:8085/api/v1/supplier/delete/${supplierId}`)
      .then(() => {
        setSuppliers(suppliers.filter((supplier) => supplier.supplierId !== supplierId));
      })
      .catch((error) => {
        console.error("Error deleting supplier:", error);
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
        fetchSuppliers(); // Refresh list after update
        setDrawerOpen(false);
      })
      .catch((error) => {
        console.error("Error updating supplier:", error);
      });
    setSelectedSupplier(null);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleRowClick = (supplier) => {
    setSelectedSupplier(supplier);
    setViewDetails(true);
  };

  const handleBackClick = () => {
    setViewDetails(false);
    setSelectedSupplier(null);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(search.toLowerCase()) ||
    supplier.supplierCode.toLowerCase().includes(search.toLowerCase())
  );

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
          <div className="w-full border-collapse p-4 flex flex-col">
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
    </>
  );
};

export default SupplierList;



