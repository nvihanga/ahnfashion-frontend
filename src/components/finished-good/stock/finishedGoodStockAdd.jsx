// import {
//   Button,
//   FormControl,
//   InputLabel,
//   TextField,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { useState } from "react";

// const styleNumberArray = [
//   { id: 1, number: "S1001" },
//   { id: 2, number: "S1002" },
//   { id: 3, number: "S1003" },
//   { id: 4, number: "S1004" },
// ];

// const descriptionArray = [
//   { id: 1, text: "Casual wear" },
//   { id: 2, text: "Formal wear" },
//   { id: 3, text: "Sportswear" },
//   { id: 4, text: "Winter collection" },
// ];

// const productNameArray = [
//   { id: 1, name: "Shirt" },
//   { id: 2, name: "Pants" },
//   { id: 3, name: "Jacket" },
//   { id: 4, name: "Dress" },
// ];

// const FinishedGoodStockAdd = () => {
//   const [styleNumber, setStyleNumber] = useState("");
//   const [productName, setProductName] = useState("");
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [unitPrice, setUnitPrice] = useState("");

//   const handleAddToList = () => {
//     console.log({ styleNumber, productName, description, quantity, unitPrice });
//   };

//   return (
//     <div className="w-full">
//       <div className="flex flex-row justify-between">
//         <h1>Finished Good Stock Add</h1>
//         <Button variant="contained">Publish</Button>
//       </div>
//       <div className="flex flex-row justify-between mt-5">
//         <div className="w-4/5">
//           {/* Style Number Dropdown */}
//           <div>
//             <FormControl fullWidth>
//               <InputLabel id="style_number">Style Number</InputLabel>
//               <Select
//                 id="style_number"
//                 value={styleNumber}
//                 label="Style Number"
//                 onChange={(e) => setStyleNumber(e.target.value)}
//               >
//                 {styleNumberArray.map((style) => (
//                   <MenuItem key={style.id} value={style.number}>
//                     {style.number}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//           {/* Product Name Dropdown */}
//           <div className="mt-5">
//             <FormControl fullWidth>
//               <InputLabel id="product_name">Product Name</InputLabel>
//               <Select
//                 id="product_name"
//                 value={productName}
//                 label="Product Name"
//                 onChange={(e) => setProductName(e.target.value)}
//               >
//                 {productNameArray.map((name) => (
//                   <MenuItem key={name.id} value={name.name}>
//                     {name.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//           {/* Description Dropdown */}
//           <div className="mt-5">
//             <FormControl fullWidth>
//               <InputLabel id="description">Description</InputLabel>
//               <Select
//                 id="description"
//                 value={description}
//                 label="Description"
//                 onChange={(e) => setDescription(e.target.value)}
//               >
//                 {descriptionArray.map((desc) => (
//                   <MenuItem key={desc.id} value={desc.text}>
//                     {desc.text}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//           {/* Quantity */}
//           <div className="mt-5">
//             <FormControl fullWidth>
//               <TextField
//                 id="quantity"
//                 label="Quantity"
//                 variant="outlined"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//               />
//             </FormControl>
//           </div>
//           {/* Unit Price */}
//           <div className="mt-5">
//             <FormControl fullWidth>
//               <TextField
//                 id="unit_price"
//                 label="Unit Price"
//                 variant="outlined"
//                 value={unitPrice}
//                 onChange={(e) => setUnitPrice(e.target.value)}
//               />
//             </FormControl>
//           </div>
//         </div>
//         <div className="flex items-end">
//           <Button variant="contained" onClick={handleAddToList}>
//             ADD TO LIST
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinishedGoodStockAdd;



import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const styleNumberArray = [
  { id: 1, number: "S1001" },
  { id: 2, number: "S1002" },
  { id: 3, number: "S1003" },
  { id: 4, number: "S1004" },
];

const descriptionArray = [
  { id: 1, text: "Casual wear" },
  { id: 2, text: "Formal wear" },
  { id: 3, text: "Sportswear" },
  { id: 4, text: "Winter collection" },
];

const productNameArray = [
  { id: 1, name: "Shirt" },
  { id: 2, name: "Pants" },
  { id: 3, name: "Jacket" },
  { id: 4, name: "Dress" },
];

const FinishedGoodStockAdd = () => {
  const [styleNumber, setStyleNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [date, setDate] = useState("");

  const handleAddToList = () => {
    console.log({ styleNumber, productName, description, quantity, unitPrice, date });
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1>Finished Good Stock Add</h1>
        <Button variant="contained">Publish</Button>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <div className="w-4/5">
          {/* Style Number Dropdown */}
          <div>
            <FormControl fullWidth>
              <InputLabel id="style_number">Style Number</InputLabel>
              <Select
                id="style_number"
                value={styleNumber}
                label="Style Number"
                onChange={(e) => setStyleNumber(e.target.value)}
              >
                {styleNumberArray.map((style) => (
                  <MenuItem key={style.id} value={style.number}>
                    {style.number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Product Name Dropdown */}
          <div className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="product_name">Product Name</InputLabel>
              <Select
                id="product_name"
                value={productName}
                label="Product Name"
                onChange={(e) => setProductName(e.target.value)}
              >
                {productNameArray.map((name) => (
                  <MenuItem key={name.id} value={name.name}>
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Description Dropdown */}
          <div className="mt-5">
            <FormControl fullWidth>
              <InputLabel id="description">Description</InputLabel>
              <Select
                id="description"
                value={description}
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
              >
                {descriptionArray.map((desc) => (
                  <MenuItem key={desc.id} value={desc.text}>
                    {desc.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* Quantity */}
          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                id="quantity"
                label="Quantity"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
          </div>
          {/* Unit Price */}
          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                id="unit_price"
                label="Unit Price"
                variant="outlined"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </FormControl>
          </div>
          {/* Date Picker */}
          <div className="mt-5">
            <FormControl fullWidth>
              <TextField
                id="date"
                label="Date"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
          </div>
        </div>
        <div className="flex items-end">
          <Button variant="contained" onClick={handleAddToList}>
            ADD TO LIST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinishedGoodStockAdd;
