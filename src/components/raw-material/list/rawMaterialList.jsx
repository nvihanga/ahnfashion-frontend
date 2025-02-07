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
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditDrawer from "./editDrawer";
import { useState, useEffect } from "react";

const rawMaterials = [
  {
    id: 1,
    productName: "Steel",
    type: "Metal",
    quantity: 100,
    supplier: "Supplier A",
    price: "$500",
  },
  {
    id: 2,
    productName: "Copper",
    type: "Metal",
    quantity: 200,
    supplier: "Supplier B",
    price: "$700",
  },
  {
    id: 3,
    productName: "Plastic",
    type: "Polymer",
    quantity: 300,
    supplier: "Supplier C",
    price: "$300",
  },
  {
    id: 4,
    productName: "Rubber",
    type: "Elastomer",
    quantity: 150,
    supplier: "Supplier D",
    price: "$400",
  },
];

const Suppliers = [
  { id: 1, name: "Supplier A" },
  { id: 2, name: "Supplier B" },
  { id: 3, name: "Supplier C" },
  { id: 4, name: "Supplier D" },
];
const rawMaterialTypes = [
  { id: 1, type: "Metal" },
  { id: 2, type: "Polymer" },
  { id: 3, type: "Elastomer" },
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
  return (
    <>
      <div className="w-full border-collapse p-4 flex flex-col">
        <div className="">
          <h1 className="text-xl ">Filter</h1>
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
                <TextField id="search" label="Search" variant="outlined" />
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <TableContainer>
        <Table width={100}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Product Name </TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRawMaterial.map((raw) => (
              <TableRow key={raw.id}>
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
