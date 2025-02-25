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
  Paper,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditDrawer from "./editDrawer";
import { useState } from "react";
import { rawMaterials } from "./data";

const Suppliers = [
  { id: 1, name: "Naturub Industries (Pvt) Ltd" },
  { id: 2, name: "CIB Accessories" },
  { id: 3, name: "Chathura Enterprices" },
  { id: 4, name: "Sanko Texttiles" },
];
const rawMaterialTypes = [
  { id: 1, type: "Buttons" },
  { id: 2, type: "Threads" },
  { id: 3, type: "Fabrics" },
  { id: 4, type: "Labels" },
];

const RawMaterialList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [supplier, setSupplier] = useState("");
  const [rawMaterialType, setRawMaterialType] = useState("");
  const [newRawMaterial, setNewRawMaterial] = useState(rawMaterials);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (raw) => {
    const updatedRawMaterials = newRawMaterial.filter(
      (material) => material.id !== raw.id
    );
    setNewRawMaterial(updatedRawMaterials);
    console.log("Updated Raw Materials:", updatedRawMaterials);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
  };

  const filter = (supplier, rawMaterialType) => {
    let filteredMaterials = newRawMaterial;

    if (supplier) {
      filteredMaterials = filteredMaterials.filter(
        (material) => material.supplier === supplier
      );
    }

    if (rawMaterialType) {
      filteredMaterials = filteredMaterials.filter(
        (material) => material.type === rawMaterialType
      );
    }

    setNewRawMaterial(filteredMaterials);
  };

  const handleSave = (updatedItem) => {
    // Handle save logic here
    console.log("Updated Item:", updatedItem);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredMaterials = rawMaterials.filter((material) =>
      material.productName.toLowerCase().includes(searchValue)
    );
    setNewRawMaterial(filteredMaterials);
  };

  return (
    <>
      <div className="w-full border-collapse p-4 flex flex-col">
        <div className="">
          <h1 className="font-bold">Filters</h1>
        </div>
        <div className=" w-full">
          <div className="flex flex-row gap-5 gap-t-5 mt-5">
            <div className="w-1/3">
              <FormControl fullWidth>
                <InputLabel id="Supplier">Supplier</InputLabel>
                <Select
                  labelId="Supplier"
                  id="Supplier"
                  label="Supplier"
                  value={supplier}
                  onChange={(e) => {
                    setSupplier(e.target.value);
                    filter(e.target.value, rawMaterialType);
                  }}
                >
                  {Suppliers.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-1/3">
              <FormControl fullWidth>
                <InputLabel id="Raw_Material_Type">
                  Raw Material Type
                </InputLabel>
                <Select
                  labelId="Raw_Material_Type"
                  id="Raw_Material_Type"
                  label="Raw Material Type"
                  value={rawMaterialType}
                  onChange={(e) => {
                    setRawMaterialType(e.target.value);
                    filter(supplier, e.target.value);
                  }}
                >
                  {rawMaterialTypes.map((type) => (
                    <MenuItem key={type.id} value={type.type}>
                      {type.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-1/3">
              <FormControl fullWidth>
                <TextField
                  id="search"
                  label="Search"
                  variant="outlined"
                  onChange={handleSearch}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <TableContainer component={Paper} elevation={3}>
        <Table width={100}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>NO</strong>
              </TableCell>
              <TableCell>
                <strong>PRODUCT NAME</strong>
              </TableCell>
              <TableCell>
                <strong>TYPE</strong>
              </TableCell>
              <TableCell>
                <strong>QUANTITY</strong>
              </TableCell>
              <TableCell>
                <strong>SUPPLIER</strong>
              </TableCell>
              <TableCell>
                <strong>PRICE</strong>
              </TableCell>
              <TableCell align="center">
                <strong>ACTION</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRawMaterial.map((raw) => (
              <TableRow key={raw.id} style={{ cursor: "pointer" }}>
                <TableCell>{raw.id}</TableCell>
                <TableCell>{raw.productName}</TableCell>
                <TableCell>{raw.type}</TableCell>
                <TableCell>{raw.quantity}</TableCell>
                <TableCell>{raw.supplier}</TableCell>
                <TableCell>{raw.price}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="info"
                    id="edit"
                    onClick={() => handleEditClick(raw)}
                  >
                    <MdEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    id="delete"
                    onClick={() => handleDeleteClick(raw)}
                  >
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
          newRawMaterial={newRawMaterial}
          setNewRawMaterial={setNewRawMaterial}
          open={drawerOpen}
          onClose={handleDrawerClose}
          item={selectedItem}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default RawMaterialList;
