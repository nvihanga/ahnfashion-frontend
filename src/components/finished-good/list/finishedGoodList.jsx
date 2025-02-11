import {
    FormControl,
    IconButton,
    InputLabel,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    MenuItem,
  } from "@mui/material";
  import { MdEdit, MdDelete } from "react-icons/md";
  import EditDrawer from "./editDrawer";
  import { useState } from "react";
  


  const finishedGoods = [
    { id: 1, name: "T-Shirt", description: "Cotton T-Shirt", quantityInStock: 150, unitPrice: "$15", uniqueItemNumber: "FG001" },
    { id: 2, name: "Jeans", description: "Denim Jeans", quantityInStock: 100, unitPrice: "$40", uniqueItemNumber: "FG002" },
    { id: 3, name: "Jacket", description: "Leather Jacket", quantityInStock: 50, unitPrice: "$100", uniqueItemNumber: "FG003" },
  ];
  
  const FinishedGoodList = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredGoods, setFilteredGoods] = useState(finishedGoods);
  
    const handleEditClick = (item) => {
      setSelectedItem(item);
      setDrawerOpen(true);
    };
  
    const handleDeleteClick = (good) => {
      const updatedGoods = filteredGoods.filter((item) => item.id !== good.id);
      setFilteredGoods(updatedGoods);
      console.log("Updated Finished Goods:", updatedGoods);
    };
  
    const handleDrawerClose = () => {
      setDrawerOpen(false);
      setSelectedItem(null);
    };
  
    const handleSave = (updatedItem) => {
      const updatedGoods = filteredGoods.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setFilteredGoods(updatedGoods);
      console.log("Updated Item:", updatedItem);
    };
  
    const handleSearch = (event) => {
      const value = event.target.value.toLowerCase();
      setSearch(value);
      setFilteredGoods(
        finishedGoods.filter((item) =>
          item.name.toLowerCase().includes(value)
        )
      );
    };
  
    return (
      <>
        <div className="w-full border-collapse p-4 flex flex-col">
          <h1 className="text-xl ">Search</h1>
          <TextField
            id="search"
            label="Search Finished Goods"
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
                <TableCell>Style Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity in Stock</TableCell>
                <TableCell>Unit Price</TableCell>
               
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGoods.map((good) => (
                <TableRow key={good.id}>
                  <TableCell>{good.id}</TableCell>
                  <TableCell>{good.uniqueItemNumber}</TableCell>
                  <TableCell>{good.name}</TableCell>
                  <TableCell>{good.description}</TableCell>
                  <TableCell>{good.quantityInStock}</TableCell>
                  <TableCell>{good.unitPrice}</TableCell>
                  
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
        {selectedItem && (
          <EditDrawer
            open={drawerOpen}
            onClose={handleDrawerClose}
            item={selectedItem}
            onSave={handleSave}
          />
        )}
      </>
    );
  };
  
  export default FinishedGoodList;
  


