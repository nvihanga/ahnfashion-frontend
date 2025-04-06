// // import { Button, TextField, IconButton } from "@mui/material";
// // import { Add, Remove } from "@mui/icons-material";
// // import { useState } from "react";
// // import axios from "axios";

// // const initialSupplierState = {
// //   supplierCode: "",
// //   name: "",
// //   email: "",
// //   phoneNumbers: [""],
// //   address: "",
// //   notes: "",
// // };

// // const SupplierForm = () => {
// //   const [supplier, setSupplier] = useState(initialSupplierState);
// //   const [errors, setErrors] = useState({});
// //   const [editingSupplierId, setEditingSupplierId] = useState(null);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setSupplier((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handlePhoneChange = (index, value) => {
// //     const updatedPhones = [...supplier.phoneNumbers];
// //     updatedPhones[index] = value;
// //     setSupplier((prev) => ({ ...prev, phoneNumbers: updatedPhones }));
// //   };

// //   const addPhoneNumber = () => {
// //     setSupplier((prev) => ({ ...prev, phoneNumbers: [...prev.phoneNumbers, ""] }));
// //   };

// //   const removePhoneNumber = (index) => {
// //     setSupplier((prev) => ({
// //       ...prev,
// //       phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
// //     }));
// //   };

// //   const validateForm = () => {
// //     let errors = {};
// //     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
// //     const phoneRegex = /^[0-9]{10}$/; // Assuming phone number should be 10 digits

// //     if (!supplier.supplierCode) errors.supplierCode = "Supplier Code is required";
// //     if (!supplier.name) errors.name = "Name is required";
// //     if (!supplier.email) {
// //       errors.email = "Email Address is required";
// //     } else if (!emailRegex.test(supplier.email)) {
// //       errors.email = "Invalid email format";
// //     }
// //     if (supplier.phoneNumbers.some((phone) => !phone || !phoneRegex.test(phone))) {
// //       errors.phoneNumbers = "Phone Numbers must be valid (10 digits)";
// //     }
// //     if (!supplier.address) errors.address = "Address is required";
// //     setErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const checkSupplierCodeExists = async (code) => {
// //     try {
// //       const response = await axios.get(`http://localhost:8085/api/v1/supplier/exists/${code}`);
// //       return response.data.exists;
// //     } catch (error) {
// //       console.error("Error checking supplier code:", error);
// //       return false;
// //     }
// //   };

// //   const handleSaveSupplier = async () => {
// //     if (!validateForm()) return;

// //     const supplierData = {
// //       supplierCode: supplier.supplierCode,
// //       supplierName: supplier.name,
// //       supplierEmail: supplier.email,
// //       supplierAddress: supplier.address,
// //       supplierPhoneNo: supplier.phoneNumbers,
// //       supplierNote: supplier.notes,
// //       outstandingBalance: 0.0,
// //       activeState: true,
// //     };

// //     try {
// //       if (!editingSupplierId) {
// //         const exists = await checkSupplierCodeExists(supplier.supplierCode);
// //         if (exists) {
// //           alert("Supplier Code already exists! Please use a different code.");
// //           return;
// //         }
// //       }

// //       if (editingSupplierId) {
// //         await axios.put(`http://localhost:8085/api/v1/supplier/update/${editingSupplierId}`, supplierData);
// //         alert("Supplier updated successfully");
// //       } else {
// //         await axios.post("http://localhost:8085/api/v1/supplier/save", supplierData);
// //         alert("Supplier added successfully");
// //       }

// //       setSupplier(initialSupplierState);
// //       setEditingSupplierId(null);
// //     } catch (error) {
// //       console.error("Error saving supplier:", error);
// //       alert("Failed to save supplier");
// //     }
// //   };

// //   const handleReset = () => {
// //     setSupplier(initialSupplierState);
// //     setErrors({});
// //     setEditingSupplierId(null);
// //   };

// //   return (
// //     <div className="w-full px-10 mt-10 space-y-5">
// //       <div className="flex flex-row items-center justify-between">
// //         <h1 className="font-bold">{editingSupplierId ? "Edit Supplier" : "Add Supplier"}</h1>
// //         <div className="flex gap-5">
// //           <Button variant="contained" onClick={handleSaveSupplier}>
// //             {editingSupplierId ? "Update" : "Submit"}
// //           </Button>
// //           <Button variant="outlined" onClick={handleReset}>Reset</Button>
// //         </div>
// //       </div>

// //       <TextField
// //         name="supplierCode"
// //         label="Supplier Code"
// //         variant="outlined"
// //         fullWidth
// //         value={supplier.supplierCode}
// //         onChange={handleChange}
// //         error={!!errors.supplierCode}
// //         helperText={errors.supplierCode}
// //       />

// //       <TextField
// //         name="name"
// //         label="Name"
// //         variant="outlined"
// //         fullWidth
// //         value={supplier.name}
// //         onChange={handleChange}
// //         error={!!errors.name}
// //         helperText={errors.name}
// //       />

// //       <TextField
// //         name="email"
// //         label="Email Address"
// //         type="email"
// //         variant="outlined"
// //         fullWidth
// //         value={supplier.email}
// //         onChange={handleChange}
// //         error={!!errors.email}
// //         helperText={errors.email}
// //       />

// //       {supplier.phoneNumbers.map((phone, index) => (
// //         <div className="flex items-center gap-2" key={index}>
// //           <TextField
// //             label={`Phone Number ${index + 1}`}
// //             variant="outlined"
// //             fullWidth
// //             value={phone}
// //             onChange={(e) => handlePhoneChange(index, e.target.value)}
// //             error={!!errors.phoneNumbers}
// //             helperText={errors.phoneNumbers}
// //           />

// //           <IconButton color="primary" onClick={addPhoneNumber}>
// //             <Add />
// //           </IconButton>
// //           {supplier.phoneNumbers.length > 1 && (
// //             <IconButton color="secondary" onClick={() => removePhoneNumber(index)}>
// //               <Remove />
// //             </IconButton>
// //           )}
// //         </div>
// //       ))}

// //       <TextField
// //         name="address"
// //         label="Address"
// //         variant="outlined"
// //         fullWidth
// //         multiline
// //         rows={2}
// //         value={supplier.address}
// //         onChange={handleChange}
// //         error={!!errors.address}
// //         helperText={errors.address}
// //       />

// //       <TextField
// //         name="notes"
// //         label="Notes"
// //         variant="outlined"
// //         fullWidth
// //         multiline
// //         rows={3}
// //         value={supplier.notes}
// //         onChange={handleChange}
// //       />
// //     </div>
// //   );
// // };

// // export default SupplierForm;


// import { Button, TextField, IconButton } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import { useState } from "react";
// import axios from "axios";

// const initialSupplierState = {
//   supplierCode: "",
//   supplierName: "",  // Changed from 'name'
//   supplierEmail: "", // Changed from 'email'
//   supplierPhoneNo: [""], // Changed from 'phoneNumbers'
//   supplierAddress: "", // Changed from 'address'
//   supplierNote: "",  // Changed from 'notes'
// };

// const SupplierForm = () => {
//   const [supplier, setSupplier] = useState(initialSupplierState);
//   const [errors, setErrors] = useState({});
//   const [editingSupplierId, setEditingSupplierId] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSupplier((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhoneChange = (index, value) => {
//     const updatedPhones = [...supplier.supplierPhoneNo];
//     updatedPhones[index] = value;
//     setSupplier((prev) => ({ ...prev, supplierPhoneNo: updatedPhones }));
//   };

//   const addPhoneNumber = () => {
//     setSupplier((prev) => ({ 
//       ...prev, 
//       supplierPhoneNo: [...prev.supplierPhoneNo, ""] 
//     }));
//   };

//   const removePhoneNumber = (index) => {
//     setSupplier((prev) => ({
//       ...prev,
//       supplierPhoneNo: prev.supplierPhoneNo.filter((_, i) => i !== index),
//     }));
//   };

//   const validateForm = () => {
//     let errors = {};
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!supplier.supplierCode) errors.supplierCode = "Supplier Code is required";
//     if (!supplier.supplierName) errors.supplierName = "Name is required";
//     if (!supplier.supplierEmail) {
//       errors.supplierEmail = "Email Address is required";
//     } else if (!emailRegex.test(supplier.supplierEmail)) {
//       errors.supplierEmail = "Invalid email format";
//     }
//     if (supplier.supplierPhoneNo.some((phone) => !phone || !phoneRegex.test(phone))) {
//       errors.supplierPhoneNo = "Phone Numbers must be valid (10 digits)";
//     }
//     if (!supplier.supplierAddress) errors.supplierAddress = "Address is required";
    
//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const checkSupplierCodeExists = async (code) => {
//     try {
//       const response = await axios.get(`http://localhost:8085/api/v1/supplier/exists/${code}`);
//       return response.data.exists;
//     } catch (error) {
//       console.error("Error checking supplier code:", error);
//       return false;
//     }
//   };

//   const handleSaveSupplier = async () => {
//     if (!validateForm()) return;

//     const supplierData = {
//       supplierCode: supplier.supplierCode,
//       supplierName: supplier.supplierName,
//       supplierEmail: supplier.supplierEmail,
//       supplierAddress: supplier.supplierAddress,
//       supplierPhoneNo: supplier.supplierPhoneNo.filter(phone => phone !== ""), // Remove empty phone numbers
//       supplierNote: supplier.supplierNote || "", // Ensure notes isn't undefined
//       outstandingBalance: 0.0,
//       activeState: true,
//     };

//     try {
//       if (!editingSupplierId) {
//         const exists = await checkSupplierCodeExists(supplier.supplierCode);
//         if (exists) {
//           setErrors(prev => ({ ...prev, supplierCode: "Supplier Code already exists" }));
//           return;
//         }
        
//         const response = await axios.post("http://localhost:8085/api/v1/supplier/save", supplierData);
//         if (response.status === 200) {
//           alert("Supplier added successfully");
//           setSupplier(initialSupplierState);
//         }
//       } else {
//         const response = await axios.put(`http://localhost:8085/api/v1/supplier/update/${editingSupplierId}`, supplierData);
//         if (response.status === 200) {
//           alert("Supplier updated successfully");
//           setSupplier(initialSupplierState);
//           setEditingSupplierId(null);
//         }
//       }
//     } catch (error) {
//       console.error("Error saving supplier:", error);
//       if (error.response?.data?.error) {
//         setErrors(prev => ({ ...prev, supplierCode: error.response.data.error }));
//       } else {
//         alert(`Failed to save supplier: ${error.message}`);
//       }
//     }
//   };

//   const handleReset = () => {
//     setSupplier(initialSupplierState);
//     setErrors({});
//     setEditingSupplierId(null);
//   };

//   return (
//     <div className="w-full px-10 mt-10 space-y-5">
//       <div className="flex flex-row items-center justify-between">
//         <h1 className="font-bold">{editingSupplierId ? "Edit Supplier" : "Add Supplier"}</h1>
//         <div className="flex gap-5">
//           <Button variant="contained" onClick={handleSaveSupplier}>
//             {editingSupplierId ? "Update" : "Submit"}
//           </Button>
//           <Button variant="outlined" onClick={handleReset}>Reset</Button>
//         </div>
//       </div>

//       <TextField
//         name="supplierCode"
//         label="Supplier Code"
//         variant="outlined"
//         fullWidth
//         value={supplier.supplierCode}
//         onChange={handleChange}
//         error={!!errors.supplierCode}
//         helperText={errors.supplierCode}
//       />

//       <TextField
//         name="supplierName"
//         label="Name"
//         variant="outlined"
//         fullWidth
//         value={supplier.supplierName}
//         onChange={handleChange}
//         error={!!errors.supplierName}
//         helperText={errors.supplierName}
//       />

//       <TextField
//         name="supplierEmail"
//         label="Email Address"
//         type="email"
//         variant="outlined"
//         fullWidth
//         value={supplier.supplierEmail}
//         onChange={handleChange}
//         error={!!errors.supplierEmail}
//         helperText={errors.supplierEmail}
//       />

//       {supplier.supplierPhoneNo.map((phone, index) => (
//         <div className="flex items-center gap-2" key={index}>
//           <TextField
//             label={`Phone Number ${index + 1}`}
//             variant="outlined"
//             fullWidth
//             value={phone}
//             onChange={(e) => handlePhoneChange(index, e.target.value)}
//             error={!!errors.supplierPhoneNo}
//             helperText={errors.supplierPhoneNo}
//           />
//           <IconButton color="primary" onClick={addPhoneNumber}>
//             <Add />
//           </IconButton>
//           {supplier.supplierPhoneNo.length > 1 && (
//             <IconButton color="secondary" onClick={() => removePhoneNumber(index)}>
//               <Remove />
//             </IconButton>
//           )}
//         </div>
//       ))}

//       <TextField
//         name="supplierAddress"
//         label="Address"
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={2}
//         value={supplier.supplierAddress}
//         onChange={handleChange}
//         error={!!errors.supplierAddress}
//         helperText={errors.supplierAddress}
//       />

//       <TextField
//         name="supplierNote"
//         label="Notes"
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={3}
//         value={supplier.supplierNote}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default SupplierForm;

import { Button, TextField, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const initialSupplierState = {
  supplierCode: "",
  supplierName: "",
  supplierEmail: "",
  supplierPhoneNo: [""], // This is already an array, so it should be fine
  supplierAddress: "",
  supplierNote: "",
};

const SupplierForm = () => {
  const [supplier, setSupplier] = useState(initialSupplierState);
  const [errors, setErrors] = useState({});
  const [editingSupplierId, setEditingSupplierId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...(supplier.supplierPhoneNo || [""])];
    updatedPhones[index] = value;
    setSupplier((prev) => ({ ...prev, supplierPhoneNo: updatedPhones }));
  };

  const addPhoneNumber = () => {
    setSupplier((prev) => ({ 
      ...prev, 
      supplierPhoneNo: [...(prev.supplierPhoneNo || []), ""] 
    }));
  };

  const removePhoneNumber = (index) => {
    setSupplier((prev) => ({
      ...prev,
      supplierPhoneNo: (prev.supplierPhoneNo || []).filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!supplier.supplierCode) errors.supplierCode = "Supplier Code is required";
    if (!supplier.supplierName) errors.supplierName = "Name is required";
    if (!supplier.supplierEmail) {
      errors.supplierEmail = "Email Address is required";
    } else if (!emailRegex.test(supplier.supplierEmail)) {
      errors.supplierEmail = "Invalid email format";
    }
    if ((supplier.supplierPhoneNo || []).some((phone) => !phone || !phoneRegex.test(phone))) {
      errors.supplierPhoneNo = "Phone Numbers must be valid (10 digits)";
    }
    if (!supplier.supplierAddress) errors.supplierAddress = "Address is required";
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkSupplierCodeExists = async (code) => {
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/supplier/exists/${code}`);
      return response.data.exists;
    } catch (error) {
      console.error("Error checking supplier code:", error);
      return false;
    }
  };

  const handleSaveSupplier = async () => {
    if (!validateForm()) return;

    const supplierData = {
      supplierCode: supplier.supplierCode,
      supplierName: supplier.supplierName,
      supplierEmail: supplier.supplierEmail,
      supplierAddress: supplier.supplierAddress,
      supplierPhoneNo: (supplier.supplierPhoneNo || []).filter(phone => phone !== ""),
      supplierNote: supplier.supplierNote || "",
      outstandingBalance: 0.0,
      activeState: true,
    };

    try {
      if (!editingSupplierId) {
        const exists = await checkSupplierCodeExists(supplier.supplierCode);
        if (exists) {
          setErrors(prev => ({ ...prev, supplierCode: "Supplier Code already exists" }));
          return;
        }
        
        const response = await axios.post("http://localhost:8085/api/v1/supplier/save", supplierData);
        if (response.status === 200) {
          alert("Supplier added successfully");
          setSupplier(initialSupplierState);
        }
      } else {
        const response = await axios.put(`http://localhost:8085/api/v1/supplier/update/${editingSupplierId}`, supplierData);
        if (response.status === 200) {
          alert("Supplier updated successfully");
          setSupplier(initialSupplierState);
          setEditingSupplierId(null);
        }
      }
    } catch (error) {
      console.error("Error saving supplier:", error);
      if (error.response?.data?.error) {
        setErrors(prev => ({ ...prev, supplierCode: error.response.data.error }));
      } else {
        alert(`Failed to save supplier: ${error.message}`);
      }
    }
  };

  const handleReset = () => {
    setSupplier(initialSupplierState);
    setErrors({});
    setEditingSupplierId(null);
  };

  return (
    <div className="w-full px-10 mt-10 space-y-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold">{editingSupplierId ? "Edit Supplier" : "Add Supplier"}</h1>
        <div className="flex gap-5">
          <Button variant="contained" onClick={handleSaveSupplier}>
            {editingSupplierId ? "Update" : "Submit"}
          </Button>
          <Button variant="outlined" onClick={handleReset}>Reset</Button>
        </div>
      </div>

      <TextField
        name="supplierCode"
        label="Supplier Code"
        variant="outlined"
        fullWidth
        value={supplier.supplierCode || ""}
        onChange={handleChange}
        error={!!errors.supplierCode}
        helperText={errors.supplierCode}
      />

      <TextField
        name="supplierName"
        label="Name"
        variant="outlined"
        fullWidth
        value={supplier.supplierName || ""}
        onChange={handleChange}
        error={!!errors.supplierName}
        helperText={errors.supplierName}
      />

      <TextField
        name="supplierEmail"
        label="Email Address"
        type="email"
        variant="outlined"
        fullWidth
        value={supplier.supplierEmail || ""}
        onChange={handleChange}
        error={!!errors.supplierEmail}
        helperText={errors.supplierEmail}
      />

      {(supplier.supplierPhoneNo || []).map((phone, index) => (
        <div className="flex items-center gap-2" key={index}>
          <TextField
            label={`Phone Number ${index + 1}`}
            variant="outlined"
            fullWidth
            value={phone || ""}
            onChange={(e) => handlePhoneChange(index, e.target.value)}
            error={!!errors.supplierPhoneNo}
            helperText={errors.supplierPhoneNo}
          />
          <IconButton color="primary" onClick={addPhoneNumber}>
            <Add />
          </IconButton>
          {(supplier.supplierPhoneNo || []).length > 1 && (
            <IconButton color="secondary" onClick={() => removePhoneNumber(index)}>
              <Remove />
            </IconButton>
          )}
        </div>
      ))}

      <TextField
        name="supplierAddress"
        label="Address"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={supplier.supplierAddress || ""}
        onChange={handleChange}
        error={!!errors.supplierAddress}
        helperText={errors.supplierAddress}
      />

      <TextField
        name="supplierNote"
        label="Notes"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={supplier.supplierNote || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default SupplierForm;