import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
  } from "@mui/material";
  import { MdEdit, MdDelete } from "react-icons/md";
  import EditDrawer from "./editDrawer";
  import { useState } from "react";
  
  const suppliers = [
    { id: 1, supplierCode: "SUP001", name: "ABC Textiles", email: "abc@example.com", phone: "123-456-7890", address: "123 Main St, NY", notes: "Preferred supplier" },
    { id: 2, supplierCode: "SUP002", name: "XYZ Fabrics", email: "xyz@example.com", phone: "987-654-3210", address: "456 Elm St, CA", notes: "Bulk orders available" },
    { id: 3, supplierCode: "SUP003", name: "Global Supplies", email: "global@example.com", phone: "555-666-7777", address: "789 Oak St, TX", notes: "Fast shipping" },
  ];
  
  const SupplierList = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  
    const handleEditClick = (supplier) => {
      setSelectedSupplier(supplier);
      setDrawerOpen(true);
    };
  
    const handleDeleteClick = (supplier) => {
      const updatedSuppliers = filteredSuppliers.filter((item) => item.id !== supplier.id);
      setFilteredSuppliers(updatedSuppliers);
      console.log("Updated Suppliers:", updatedSuppliers);
    };
  
    const handleDrawerClose = () => {
      setDrawerOpen(false);
      setSelectedSupplier(null);
    };
  
    const handleSave = (updatedSupplier) => {
      const updatedSuppliers = filteredSuppliers.map((item) =>
        item.id === updatedSupplier.id ? updatedSupplier : item
      );
      setFilteredSuppliers(updatedSuppliers);
      console.log("Updated Supplier:", updatedSupplier);
    };
  
    const handleSearch = (event) => {
      const value = event.target.value.toLowerCase();
      setSearch(value);
      setFilteredSuppliers(
        suppliers.filter((supplier) =>
          supplier.name.toLowerCase().includes(value)
        )
      );
    };
  
    return (
      <>
        <div className="w-full border-collapse p-4 flex flex-col">
          <h1 className="text-xl">Search</h1>
          <TextField
            id="search"
            label="Search Suppliers"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            fullWidth
            margin="normal"
          />
        </div>
  
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Supplier Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell>{supplier.supplierCode}</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.notes}</TableCell>
                  <TableCell align="center">
                    <IconButton color="info" onClick={() => handleEditClick(supplier)}>
                      <MdEdit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(supplier)}>
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
  