

// // import {
// //   Button,
// //   TextField,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// // } from "@mui/material";
// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // const sizeMapping = {
// //   "XXL": "2XL",
// //   "XXXL": "3XL",
// //   "XXXXL": "4XL",
// //   "XXXXXXL": "5XL",
// // };

// // const initialFinishedGoodState = {
// //   name: "",
// //   description: "",
// //   uniqueItemNumber: "",
// //   sizes: [
// //     { size: "L", unitPrice: 0, quantity: 0 },
// //     { size: "XL", unitPrice: 0, quantity: 0 },
// //     { size: "2XL", unitPrice: 0, quantity: 0 },
// //     { size: "3XL", unitPrice: 0, quantity: 0 },
// //     { size: "4XL", unitPrice: 0, quantity: 0 },
// //     { size: "5XL", unitPrice: 0, quantity: 0 },
// //   ],
// // };

// // const FinishedGoodForm = () => {
// //   const [finishedGood, setFinishedGood] = useState(initialFinishedGoodState);
// //   const [errors, setErrors] = useState({});
// //   const [nextStyleNumber, setNextStyleNumber] = useState(1);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:8085/api/v1/finishedGood/all")
// //       .then((response) => {
// //         const data = response.data;
// //         if (data.length > 0) {
// //           const lastItem = data[data.length - 1];
// //           setNextStyleNumber(lastItem.finishId + 1);
// //         }
// //       })
// //       .catch((error) => console.error("Error fetching finished goods:", error));
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFinishedGood((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleTableChange = (index, field, value) => {
// //     const newSizes = [...finishedGood.sizes];
// //     newSizes[index] = { ...newSizes[index], [field]: value };
// //     setFinishedGood((prev) => ({ ...prev, sizes: newSizes }));
// //   };

// //   const validateForm = () => {
// //     let tempErrors = {};
// //     if (!finishedGood.name) tempErrors.name = "Name is required";
// //     if (!finishedGood.description) tempErrors.description = "Description is required";
// //     setErrors(tempErrors);
// //     return Object.keys(tempErrors).length === 0;
// //   };

// //   const handleAddFinishedGood = async () => {
// //     if (!validateForm()) return;

// //     const validSizes = finishedGood.sizes.filter(
// //       (item) => parseFloat(item.unitPrice) > 0 || parseInt(item.quantity) > 0
// //     );

// //     if (validSizes.length === 0) {
// //       alert("At least one size must have a non-zero unit price or quantity.");
// //       return;
// //     }

// //     const finishedGoodData = {
// //       finishName: finishedGood.name,
// //       finishDescription: finishedGood.description,
// //       finishedGoodVariants: validSizes.map((item) => ({
// //         size: Object.keys(sizeMapping).find((key) => sizeMapping[key] === item.size) || item.size,
// //         unitPrice: parseFloat(item.unitPrice) || 0,
// //         quantityInStock: parseInt(item.quantity) || 0,
// //       })),
// //     };

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:8085/api/v1/finishedGood/save",
// //         finishedGoodData
// //       );

// //       if (response.status === 200 || response.status === 201) {
// //         alert("Finished Good added successfully!");
// //         setNextStyleNumber(nextStyleNumber + 1);
// //         setFinishedGood(initialFinishedGoodState);
// //         setErrors({});
// //       }
// //     } catch (error) {
// //       console.error("Error saving finished good:", error);
// //       alert("Error adding Finished Good: " + (error.response?.data?.message || error.message));
// //     }
// //   };

// //   return (
// //     <div className="w-full mt-10 px-10">
// //       <div className="flex flex-row justify-between gap-5">
// //         <h1 className="font-bold">Add Finished Good</h1>
// //         <Button variant="contained" onClick={handleAddFinishedGood}>
// //           Submit
// //         </Button>
// //       </div>

// //       <div className="mt-5 space-y-5">
// //         <TextField label="Style Number" variant="outlined" fullWidth value={nextStyleNumber} disabled />
// //         <TextField name="name" label="Name" variant="outlined" fullWidth value={finishedGood.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
// //         <TextField name="description" label="Description" variant="outlined" fullWidth multiline rows={4} value={finishedGood.description} onChange={handleChange} error={!!errors.description} helperText={errors.description} />
// //       </div>

// //       <TableContainer component={Paper} className="mt-5">
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Size</TableCell>
// //               <TableCell>Unit Price</TableCell>
// //               <TableCell>Quantity</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {finishedGood.sizes.map((item, index) => (
// //               <TableRow key={item.size}>
// //                 <TableCell>{item.size}</TableCell>
// //                 <TableCell>
// //                   <TextField type="number" variant="outlined" size="small" value={item.unitPrice} onChange={(e) => handleTableChange(index, "unitPrice", e.target.value)} inputProps={{ min: 0, step: "0.01" }} />
// //                 </TableCell>
// //                 <TableCell>
// //                   <TextField type="number" variant="outlined" size="small" value={item.quantity} onChange={(e) => handleTableChange(index, "quantity", e.target.value)} inputProps={{ min: 0 }} />
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </div>
// //   );
// // };

// // export default FinishedGoodForm;



// import {
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const sizeMapping = {
//   "XXL": "2XL",
//   "XXXL": "3XL",
//   "XXXXL": "4XL",
//   "XXXXXXL": "5XL",
// };

// const initialFinishedGoodState = {
//   name: "",
//   description: "",
//   uniqueItemNumber: "",
//   sizes: [
//     { size: "L", unitPrice: 0, quantity: 0 },
//     { size: "XL", unitPrice: 0, quantity: 0 },
//     { size: "2XL", unitPrice: 0, quantity: 0 },
//     { size: "3XL", unitPrice: 0, quantity: 0 },
//     { size: "4XL", unitPrice: 0, quantity: 0 },
//     { size: "5XL", unitPrice: 0, quantity: 0 },
//   ],
// };

// const FinishedGoodForm = () => {
//   const [finishedGood, setFinishedGood] = useState(initialFinishedGoodState);
//   const [errors, setErrors] = useState({});
//   const [nextStyleNumber, setNextStyleNumber] = useState(1);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8085/api/v1/finishedGood/all")
//       .then((response) => {
//         const data = response.data;
//         if (data.length > 0) {
//           const lastItem = data[data.length - 1];
//           setNextStyleNumber(lastItem.finishId + 1);
//         }
//       })
//       .catch((error) => console.error("Error fetching finished goods:", error));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFinishedGood((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTableChange = (index, field, value) => {
//     const newSizes = [...finishedGood.sizes];
//     newSizes[index] = { ...newSizes[index], [field]: value };
//     setFinishedGood((prev) => ({ ...prev, sizes: newSizes }));
//   };

//   const validateForm = () => {
//     let tempErrors = {};
//     if (!finishedGood.name) tempErrors.name = "Name is required";
//     if (!finishedGood.description) tempErrors.description = "Description is required";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleAddFinishedGood = async () => {
//     if (!validateForm()) return;

//     const validSizes = finishedGood.sizes.filter(
//       (item) => parseFloat(item.unitPrice) > 0 || parseInt(item.quantity) > 0
//     );

//     if (validSizes.length === 0) {
//       alert("At least one size must have a non-zero unit price or quantity.");
//       return;
//     }

//     const finishedGoodData = {
//       finishName: finishedGood.name,
//       finishDescription: finishedGood.description,
//       finishedGoodVariants: validSizes.map((item) => ({
//         size: Object.entries(sizeMapping).find(([_, displaySize]) => displaySize === item.size)?.[0] || item.size,
//         unitPrice: parseFloat(item.unitPrice) || 0,
//         quantityInStock: parseInt(item.quantity) || 0,
//       })),
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:8085/api/v1/finishedGood/save",
//         finishedGoodData
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("Finished Good added successfully!");
//         setNextStyleNumber(nextStyleNumber + 1);
//         setFinishedGood(initialFinishedGoodState);
//         setErrors({});
//       }
//     } catch (error) {
//       console.error("Error saving finished good:", error);
//       alert("Error adding Finished Good: " + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <div className="w-full mt-10 px-10">
//       <div className="flex flex-row justify-between gap-5">
//         <h1 className="font-bold">Add Finished Good</h1>
//         <Button variant="contained" onClick={handleAddFinishedGood}>
//           Submit
//         </Button>
//       </div>

//       <div className="mt-5 space-y-5">
//         <TextField label="Style Number" variant="outlined" fullWidth value={nextStyleNumber} disabled />
//         <TextField name="name" label="Name" variant="outlined" fullWidth value={finishedGood.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
//         <TextField name="description" label="Description" variant="outlined" fullWidth multiline rows={4} value={finishedGood.description} onChange={handleChange} error={!!errors.description} helperText={errors.description} />
//       </div>

//       <TableContainer component={Paper} className="mt-5">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Size</TableCell>
//               <TableCell>Unit Price</TableCell>
//               <TableCell>Quantity</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {finishedGood.sizes.map((item, index) => (
//               <TableRow key={item.size}>
//                 <TableCell>{item.size}</TableCell>
//                 <TableCell>
//                   <TextField type="number" variant="outlined" size="small" value={item.unitPrice} onChange={(e) => handleTableChange(index, "unitPrice", e.target.value)} inputProps={{ min: 0, step: "0.01" }} />
//                 </TableCell>
//                 <TableCell>
//                   <TextField type="number" variant="outlined" size="small" value={item.quantity} onChange={(e) => handleTableChange(index, "quantity", e.target.value)} inputProps={{ min: 0 }} />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default FinishedGoodForm;

import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const sizeMapping = {
  "XXL": "2XL",
  "XXXL": "3XL",
  "XXXXL": "4XL",
  "XXXXXL": "5XL",
};

const initialFinishedGoodState = {
  name: "",
  description: "",
  uniqueItemNumber: "",
  sizes: [
    { size: "L", unitPrice: "", quantity: "" },
    { size: "XL", unitPrice: "", quantity: "" },
    { size: "2XL", unitPrice: "", quantity: "" },
    { size: "3XL", unitPrice: "", quantity: "" },
    { size: "4XL", unitPrice: "", quantity: "" },
    { size: "5XL", unitPrice: "", quantity: "" },
  ],
};

const FinishedGoodForm = () => {
  const [finishedGood, setFinishedGood] = useState(initialFinishedGoodState);
  const [errors, setErrors] = useState({});
  const [nextStyleNumber, setNextStyleNumber] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/v1/finishedGood/all")
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const lastItem = data[data.length - 1];
          setNextStyleNumber(lastItem.finishId + 1);
        }
      })
      .catch((error) => console.error("Error fetching finished goods:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinishedGood((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableChange = (index, field, value) => {
    // Ensure only valid numbers or empty strings are accepted
    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
      const newSizes = [...finishedGood.sizes];
      newSizes[index] = { ...newSizes[index], [field]: value };
      setFinishedGood((prev) => ({ ...prev, sizes: newSizes }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!finishedGood.name.trim()) tempErrors.name = "Name is required";
    if (!finishedGood.description.trim()) tempErrors.description = "Description is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddFinishedGood = async () => {
    if (!validateForm()) return;

    const validSizes = finishedGood.sizes.filter(
      (item) => 
        (item.unitPrice !== "" && Number(item.unitPrice) > 0) || 
        (item.quantity !== "" && Number(item.quantity) > 0)
    );

    if (validSizes.length === 0) {
      alert("At least one size must have a non-zero unit price or quantity.");
      return;
    }

    const finishedGoodData = {
      finishName: finishedGood.name.trim(),
      finishDescription: finishedGood.description.trim(),
      finishedGoodVariants: validSizes.map((item) => {
        const displaySize = item.size;
        const apiSize = Object.keys(sizeMapping).find(
          (key) => sizeMapping[key] === displaySize
        ) || displaySize;
        
        return {
          size: apiSize,
          unitPrice: item.unitPrice === "" ? 0 : Number.parseFloat(item.unitPrice).toFixed(2),
          quantityInStock: item.quantity === "" ? 0 : Number.parseInt(item.quantity),
        };
      }),
    };

    try {
      const response = await axios.post(
        "http://localhost:8085/api/v1/finishedGood/save",
        finishedGoodData
      );

      if (response.status === 200 || response.status === 201) {
        alert("Finished Good added successfully!");
        setNextStyleNumber(nextStyleNumber + 1);
        setFinishedGood(initialFinishedGoodState);
        setErrors({});
      }
    } catch (error) {
      console.error("Error saving finished good:", error);
      alert("Error adding Finished Good: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="w-full mt-10 px-10">
      <div className="flex flex-row justify-between gap-5">
        <h1 className="font-bold">Add Finished Good</h1>
        <Button variant="contained" onClick={handleAddFinishedGood}>
          Submit
        </Button>
      </div>

      <div className="mt-5 space-y-5">
        <TextField 
          label="Style Number" 
          variant="outlined" 
          fullWidth 
          value={nextStyleNumber} 
          disabled 
        />
        <TextField 
          name="name" 
          label="Name" 
          variant="outlined" 
          fullWidth 
          value={finishedGood.name} 
          onChange={handleChange} 
          error={!!errors.name} 
          helperText={errors.name} 
        />
        <TextField 
          name="description" 
          label="Description" 
          variant="outlined" 
          fullWidth 
          multiline 
          rows={4} 
          value={finishedGood.description} 
          onChange={handleChange} 
          error={!!errors.description} 
          helperText={errors.description} 
        />
      </div>

      <TableContainer component={Paper} className="mt-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finishedGood.sizes.map((item, index) => (
              <TableRow key={item.size}>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                  <TextField 
                    type="number" 
                    variant="outlined" 
                    size="small" 
                    value={item.unitPrice} 
                    onChange={(e) => handleTableChange(index, "unitPrice", e.target.value)} 
                    inputProps={{ min: 0, step: "0.01" }} 
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    type="number" 
                    variant="outlined" 
                    size="small" 
                    value={item.quantity} 
                    onChange={(e) => handleTableChange(index, "quantity", e.target.value)} 
                    inputProps={{ min: 0, step: "1" }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FinishedGoodForm;