import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";

import EditDrawer from "./editDrawer";
import { useState } from "react";
import { rawMaterials } from "./data";
import DialogBox from "./dialogBox";
import { Edit, Trash2 } from "lucide-react";

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
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
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
    setDialogBoxOpen(false);
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

  const handleDialogBoxOpen = (raw) => {
    setDialogBoxOpen(true);
    setSelectedItem(raw);
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
                  label="Search by Product Name"
                  variant="outlined"
                  onChange={handleSearch}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newRawMaterial.map((raw) => (
              <tr key={raw.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{raw.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {raw.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{raw.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{raw.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{raw.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap">Rs.{raw.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditClick(raw)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDialogBoxOpen(raw)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

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
          <DialogBox
            openProp={dialogBoxOpen}
            onCloseProp={() => setDialogBoxOpen(false)}
            selectedItemProp={selectedItem}
            handleDeleteProp={() => handleDeleteClick(selectedItem)}
          />
        </table>
      </div>
    </>
  );
};

export default RawMaterialList;
