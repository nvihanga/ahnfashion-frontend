// // // // // import React, { useState } from "react";
// // // // // import { Drawer, TextField, Button, IconButton } from "@mui/material";
// // // // // import { MdAdd, MdDelete } from "react-icons/md";

// // // // // const EditDrawerCustomer = ({ open, onClose, item, onSave }) => {
// // // // //   const [customer, setCustomer] = useState({
// // // // //     ...item,
// // // // //     phoneNumbers: item.phoneNumbers || [""]
// // // // //   });

// // // // //   const handleChange = (e) => {
// // // // //     setCustomer({ ...customer, [e.target.name]: e.target.value });
// // // // //   };

// // // // //   const handlePhoneNumberChange = (index, value) => {
// // // // //     const updatedPhoneNumbers = [...customer.phoneNumbers];
// // // // //     updatedPhoneNumbers[index] = value;
// // // // //     setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
// // // // //   };

// // // // //   const handleAddPhoneNumber = () => {
// // // // //     setCustomer({ ...customer, phoneNumbers: [...customer.phoneNumbers, ""] });
// // // // //   };

// // // // //   const handleRemovePhoneNumber = (index) => {
// // // // //     const updatedPhoneNumbers = customer.phoneNumbers.filter((_, i) => i !== index);
// // // // //     setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
// // // // //   };

// // // // //   const handleSubmit = () => {
// // // // //     onSave(customer);
// // // // //   };

// // // // //   return (
// // // // //       <Drawer anchor="right" open={open} onClose={onClose}>
// // // // //         <div className="p-4 w-80">
// // // // //           <h2>Edit Customer</h2>
// // // // //           {/* <TextField
// // // // //               label="Customer Code"
// // // // //               name="customerCode"
// // // // //               value={customer.customerCode}
// // // // //               onChange={handleChange}
// // // // //               fullWidth
// // // // //               margin="normal"
// // // // //           /> */}
// // // // //           <TextField
// // // // //               label="Name"
// // // // //               name="customerName"
// // // // //               value={customer.customerName}
// // // // //               onChange={handleChange}
// // // // //               fullWidth
// // // // //               margin="normal"
// // // // //           />
// // // // //           <TextField
// // // // //               label="Email"
// // // // //               name="email"
// // // // //               value={customer.email}
// // // // //               onChange={handleChange}
// // // // //               fullWidth
// // // // //               margin="normal"
// // // // //           />
// // // // //           <div>
// // // // //             <label>Phone Numbers</label>
// // // // //             {customer.phoneNumbers.map((phone, index) => (
// // // // //                 <div key={index} className="flex items-center gap-2 mt-2">
// // // // //                   <TextField
// // // // //                       label={`Phone ${index + 1}`}
// // // // //                       value={phone}
// // // // //                       onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
// // // // //                       fullWidth
// // // // //                       margin="normal"
// // // // //                   />
// // // // //                   <IconButton onClick={() => handleRemovePhoneNumber(index)} color="error">
// // // // //                     <MdDelete />
// // // // //                   </IconButton>
// // // // //                 </div>
// // // // //             ))}
// // // // //             <Button
// // // // //                 variant="outlined"
// // // // //                 startIcon={<MdAdd />}
// // // // //                 onClick={handleAddPhoneNumber}
// // // // //                 className="mt-2"
// // // // //             >
// // // // //               Add Phone
// // // // //             </Button>
// // // // //           </div>
// // // // //           <TextField
// // // // //               label="Address"
// // // // //               name="address"
// // // // //               value={customer.address}
// // // // //               onChange={handleChange}
// // // // //               fullWidth
// // // // //               margin="normal"
// // // // //           />
// // // // //           <TextField
// // // // //               label="Notes"
// // // // //               name="notes"
// // // // //               value={customer.notes}
// // // // //               onChange={handleChange}
// // // // //               fullWidth
// // // // //               margin="normal"
// // // // //               multiline
// // // // //               rows={3}
// // // // //           />
// // // // //           <Button variant="contained" color="primary" onClick={handleSubmit} className="mt-4">
// // // // //             Save
// // // // //           </Button>
// // // // //         </div>
// // // // //       </Drawer>
// // // // //   );
// // // // // };

// // // // // export default EditDrawerCustomer;

// // // // // EditDrawerCustomer.jsx
// // // // import React, { useState } from "react";
// // // // import { Drawer, TextField, Button, IconButton } from "@mui/material";
// // // // import { MdAdd, MdDelete } from "react-icons/md";

// // // // const EditDrawerCustomer = ({ open, onClose, item, onSave }) => {
// // // //     const [customer, setCustomer] = useState({
// // // //         customerId: item?.customerId || "",
// // // //         customerName: item?.customerName || "",
// // // //         email: item?.email || "",
// // // //         phoneNumbers: item?.phoneNumbers || [""],
// // // //         address: item?.address || "",
// // // //         notes: item?.notes || ""
// // // //     });
// // // //     const [errors, setErrors] = useState({});

// // // //     const handleChange = (e) => {
// // // //         setCustomer({ ...customer, [e.target.name]: e.target.value });
// // // //     };

// // // //     const handlePhoneNumberChange = (index, value) => {
// // // //         if (!/^[0-9]{0,10}$/.test(value)) return;
// // // //         const updatedPhoneNumbers = [...customer.phoneNumbers];
// // // //         updatedPhoneNumbers[index] = value;
// // // //         setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
// // // //     };

// // // //     const handleAddPhoneNumber = () => {
// // // //         setCustomer({ ...customer, phoneNumbers: [...customer.phoneNumbers, ""] });
// // // //     };

// // // //     const handleRemovePhoneNumber = (index) => {
// // // //         const updatedPhoneNumbers = customer.phoneNumbers.filter((_, i) => i !== index);
// // // //         setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
// // // //     };

// // // //     const validate = () => {
// // // //         let tempErrors = {};
// // // //         if (customer.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(customer.email)) {
// // // //             tempErrors.email = "Invalid email format";
// // // //         }
// // // //         customer.phoneNumbers.forEach((phone, index) => {
// // // //             if (phone && phone.length !== 10) {
// // // //                 tempErrors[`phone${index}`] = "Phone must be 10 digits";
// // // //             }
// // // //         });
// // // //         setErrors(tempErrors);
// // // //         return Object.keys(tempErrors).length === 0;
// // // //     };

// // // //     const handleSubmit = () => {
// // // //         if (validate()) {
// // // //             onSave(customer);
// // // //         }
// // // //     };

// // // //     return (
// // // //         <Drawer anchor="right" open={open} onClose={onClose}>
// // // //             <div className="p-4 w-80">
// // // //                 <h2 className="text-xl mb-4">Edit Customer</h2>
// // // //                 <TextField
// // // //                     label="Name"
// // // //                     name="customerName"
// // // //                     value={customer.customerName}
// // // //                     onChange={handleChange}
// // // //                     fullWidth
// // // //                     margin="normal"
// // // //                 />
// // // //                 <TextField
// // // //                     label="Email"
// // // //                     name="email"
// // // //                     value={customer.email}
// // // //                     onChange={handleChange}
// // // //                     fullWidth
// // // //                     margin="normal"
// // // //                     error={!!errors.email}
// // // //                     helperText={errors.email}
// // // //                 />
// // // //                 <div className="mt-4">
// // // //                     <label className="block mb-2">Phone Numbers</label>
// // // //                     {customer.phoneNumbers.map((phone, index) => (
// // // //                         <div key={index} className="flex items-center gap-2 mb-2">
// // // //                             <TextField
// // // //                                 label={`Phone ${index + 1}`}
// // // //                                 value={phone}
// // // //                                 onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
// // // //                                 fullWidth
// // // //                                 error={!!errors[`phone${index}`]}
// // // //                                 helperText={errors[`phone${index}`]}
// // // //                             />
// // // //                             {customer.phoneNumbers.length > 1 && (
// // // //                                 <IconButton onClick={() => handleRemovePhoneNumber(index)} color="error">
// // // //                                     <MdDelete />
// // // //                                 </IconButton>
// // // //                             )}
// // // //                         </div>
// // // //                     ))}
// // // //                     <Button
// // // //                         variant="outlined"
// // // //                         startIcon={<MdAdd />}
// // // //                         onClick={handleAddPhoneNumber}
// // // //                         className="mt-2"
// // // //                     >
// // // //                         Add Phone
// // // //                     </Button>
// // // //                 </div>
// // // //                 <TextField
// // // //                     label="Address"
// // // //                     name="address"
// // // //                     value={customer.address}
// // // //                     onChange={handleChange}
// // // //                     fullWidth
// // // //                     margin="normal"
// // // //                 />
// // // //                 <TextField
// // // //                     label="Notes"
// // // //                     name="notes"
// // // //                     value={customer.notes}
// // // //                     onChange={handleChange}
// // // //                     fullWidth
// // // //                     margin="normal"
// // // //                     multiline
// // // //                     rows={3}
// // // //                 />
// // // //                 <Button 
// // // //                     variant="contained" 
// // // //                     color="primary" 
// // // //                     onClick={handleSubmit} 
// // // //                     className="mt-4 w-full"
// // // //                 >
// // // //                     Save
// // // //                 </Button>
// // // //             </div>
// // // //         </Drawer>
// // // //     );
// // // // };

// // // // export default EditDrawerCustomer;



// // // // EditDrawerCustomer.jsx
// // // import React, { useState } from "react";
// // // import { Drawer, TextField, Button, IconButton } from "@mui/material";
// // // import { MdAdd, MdDelete } from "react-icons/md";

// // // const EditDrawerCustomer = ({ open, onClose, item, onSave }) => {
// // //     const [customer, setCustomer] = useState({
// // //         customerId: item?.customerId || "",
// // //         customerName: item?.customerName || "",
// // //         email: item?.email || "",
// // //         phoneNumbers: item?.phoneNumbers || [""],
// // //         address: item?.address || "",
// // //         notes: item?.notes || ""
// // //     });
// // //     const [errors, setErrors] = useState({});

// // //     const handleChange = (e) => {
// // //         setCustomer({ ...customer, [e.target.name]: e.target.value });
// // //     };

// // //     const handlePhoneNumberChange = (index, value) => {
// // //         if (!/^[0-9]{0,10}$/.test(value)) return;
// // //         const updatedPhoneNumbers = [...customer.phoneNumbers];
// // //         updatedPhoneNumbers[index] = value;
// // //         setCustomer({ ...customer, phoneSTOPNumbers: updatedPhoneNumbers });
// // //     };

// // //     const handleAddPhoneNumber = () => {
// // //         setCustomer({ ...customer, phoneNumbers: [...customer.phoneNumbers, ""] });
// // //     };

// // //     const handleRemovePhoneNumber = (index) => {
// // //         const updatedPhoneNumbers = customer.phoneNumbers.filter((_, i) => i !== index);
// // //         setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
// // //     };

// // //     const validate = () => {
// // //         let tempErrors = {};
// // //         if (customer.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(customer.email)) {
// // //             tempErrors.email = "Invalid email format";
// // //         }
// // //         customer.phoneNumbers.forEach((phone, index) => {
// // //             if (phone && phone.length !== 10) {
// // //                 tempErrors[`phone${index}`] = "Phone must be 10 digits";
// // //             }
// // //         });
// // //         setErrors(tempErrors);
// // //         return Object.keys(tempErrors).length === 0;
// // //     };

// // //     const handleSubmit = () => {
// // //         if (validate()) {
// // //             console.log("Submitting customer:", customer);
// // //             onSave(customer);
// // //         }
// // //     };

// // //     return (
// // //         <Drawer anchor="right" open={open} onClose={onClose}>
// // //             <div className="p-4 w-80">
// // //                 <h2 className="text-xl mb-4">Edit Customer</h2>
// // //                 <TextField
// // //                     label="Name"
// // //                     name="customerName"
// // //                     value={customer.customerName}
// // //                     onChange={handleChange}
// // //                     fullWidth
// // //                     margin="normal"
// // //                 />
// // //                 <TextField
// // //                     label="Email"
// // //                     name="email"
// // //                     value={customer.email}
// // //                     onChange={handleChange}
// // //                     fullWidth
// // //                     margin="normal"
// // //                     error={!!errors.email}
// // //                     helperText={errors.email}
// // //                 />
// // //                 <div className="mt-4">
// // //                     <label className="block mb-2">Phone Numbers</label>
// // //                     {customer.phoneNumbers.map((phone, index) => (
// // //                         <div key={index} className="flex items-center gap-2 mb-2">
// // //                             <TextField
// // //                                 label={`Phone ${index + 1}`}
// // //                                 value={phone}
// // //                                 onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
// // //                                 fullWidth
// // //                                 error={!!errors[`phone${index}`]}
// // //                                 helperText={errors[`phone${index}`]}
// // //                             />
// // //                             {customer.phoneNumbers.length > 1 && (
// // //                                 <IconButton onClick={() => handleRemovePhoneNumber(index)} color="error">
// // //                                     <MdDelete />
// // //                                 </IconButton>
// // //                             )}
// // //                         </div>
// // //                     ))}
// // //                     <Button
// // //                         variant="outlined"
// // //                         startIcon={<MdAdd />}
// // //                         onClick={handleAddPhoneNumber}
// // //                         className="mt-2"
// // //                     >
// // //                         Add Phone
// // //                     </Button>
// // //                 </div>
// // //                 <TextField
// // //                     label="Address"
// // //                     name="address"
// // //                     value={customer.address}
// // //                     onChange={handleChange}
// // //                     fullWidth
// // //                     margin="normal"
// // //                 />
// // //                 <TextField
// // //                     label="Notes"
// // //                     name="notes"
// // //                     value={customer.notes}
// // //                     onChange={handleChange}
// // //                     fullWidth
// // //                     margin="normal"
// // //                     multiline
// // //                     rows={3}
// // //                 />
// // //                 <Button 
// // //                     variant="contained" 
// // //                     color="primary" 
// // //                     onClick={handleSubmit} 
// // //                     className="mt-4 w-full"
// // //                 >
// // //                     Save
// // //                 </Button>
// // //             </div>
// // //         </Drawer>
// // //     );
// // // };

// // // export default EditDrawerCustomer;


// // import React, { useState, useEffect } from "react";
// // import { Drawer, TextField, Button, IconButton } from "@mui/material";
// // import { MdAdd, MdDelete } from "react-icons/md";

// // const EditDrawerCustomer = ({ open, onClose, item, onSave }) => {
// //     const [customer, setCustomer] = useState({
// //         customerId: "",
// //         customerName: "",
// //         email: "",
// //         phoneNumbers: [""],
// //         address: "",
// //         notes: ""
// //     });
// //     const [errors, setErrors] = useState({});

// //     useEffect(() => {
// //         if (item) {
// //             setCustomer({
// //                 customerId: item.customerId || "",
// //                 customerName: item.customerName || "",
// //                 email: item.email || "",
// //                 phoneNumbers: item.phoneNumbers || [""],
// //                 address: item.address || "",
// //                 notes: item.notes || ""
// //             });
// //         }
// //     }, [item]);

// //     const handleChange = (e) => {
// //         setCustomer({ ...customer, [e.target.name]: e.target.value });
// //     };

// //     const handlePhoneNumberChange = (index, value) => {
// //         if (!/^[0-9]{0,10}$/.test(value)) return;
// //         const updatedPhoneNumbers = [...customer.phoneNumbers];
// //         updatedPhoneNumbers[index] = value;
// //         setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
// //     };

// //     const handleAddPhoneNumber = () => {
// //         setCustomer({ ...customer, phoneNumbers: [...customer.phoneNumbers, ""] });
// //     };

// //     const handleRemovePhoneNumber = (index) => {
// //         const updatedPhoneNumbers = customer.phoneNumbers.filter((_, i) => i !== index);
// //         setCustomer({ ...customer, phoneNumbers: updatedPhoneNumbers });
// //     };

// //     const validate = () => {
// //         let tempErrors = {};
// //         if (customer.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(customer.email)) {
// //             tempErrors.email = "Invalid email format";
// //         }
// //         customer.phoneNumbers.forEach((phone, index) => {
// //             if (phone && phone.length !== 10) {
// //                 tempErrors[`phone${index}`] = "Phone must be 10 digits";
// //             }
// //         });
// //         setErrors(tempErrors);
// //         return Object.keys(tempErrors).length === 0;
// //     };

// //     const handleSubmit = () => {
// //         if (validate()) {
// //             console.log("Submitting customer:", customer);
// //             onSave(customer);
// //         }
// //     };

// //     return (
// //         <Drawer anchor="right" open={open} onClose={onClose}>
// //             <div className="p-4 w-80">
// //                 <h2 className="text-xl mb-4">Edit Customer</h2>
// //                 <TextField
// //                     label="Name"
// //                     name="customerName"
// //                     value={customer.customerName}
// //                     onChange={handleChange}
// //                     fullWidth
// //                     margin="normal"
// //                 />
// //                 <TextField
// //                     label="Email"
// //                     name="email"
// //                     value={customer.email}
// //                     onChange={handleChange}
// //                     fullWidth
// //                     margin="normal"
// //                     error={!!errors.email}
// //                     helperText={errors.email}
// //                 />
// //                 <div className="mt-4">
// //                     <label className="block mb-2">Phone Numbers</label>
// //                     {customer.phoneNumbers.map((phone, index) => (
// //                         <div key={index} className="flex items-center gap-2 mb-2">
// //                             <TextField
// //                                 label={`Phone ${index + 1}`}
// //                                 value={phone}
// //                                 onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
// //                                 fullWidth
// //                                 error={!!errors[`phone${index}`]}
// //                                 helperText={errors[`phone${index}`]}
// //                             />
// //                             {customer.phoneNumbers.length > 1 && (
// //                                 <IconButton onClick={() => handleRemovePhoneNumber(index)} color="error">
// //                                     <MdDelete />
// //                                 </IconButton>
// //                             )}
// //                         </div>
// //                     ))}
// //                     <Button
// //                         variant="outlined"
// //                         startIcon={<MdAdd />}
// //                         onClick={handleAddPhoneNumber}
// //                         className="mt-2"
// //                     >
// //                         Add Phone
// //                     </Button>
// //                 </div>
// //                 <TextField
// //                     label="Address"
// //                     name="address"
// //                     value={customer.address}
// //                     onChange={handleChange}
// //                     fullWidth
// //                     margin="normal"
// //                 />
// //                 <TextField
// //                     label="Notes"
// //                     name="notes"
// //                     value={customer.notes}
// //                     onChange={handleChange}
// //                     fullWidth
// //                     margin="normal"
// //                     multiline
// //                     rows={3}
// //                 />
// //                 <Button 
// //                     variant="contained" 
// //                     color="primary" 
// //                     onClick={handleSubmit} 
// //                     className="mt-4 w-full"
// //                 >
// //                     Save
// //                 </Button>
// //             </div>
// //         </Drawer>
// //     );
// // };

// // export default EditDrawerCustomer;


// import React, { useState, useEffect } from "react";
// import {
//     Drawer,
//     TextField,
//     Button,
//     Typography,
//     IconButton,
//     Box,
//     Divider,
//     Stack,
//     Snackbar,
//     Alert,
// } from "@mui/material";
// import { MdClose } from "react-icons/md";

// const EditDrawer = ({ open, onClose, item, onSave }) => {
//     const [formData, setFormData] = useState({
//         customerId: "",
//         customerCode: "",
//         customerName: "",
//         customerEmail: "",
//         customerPhoneNo: [""],
//         customerAddress: "",
//         customerNote: "",
//     });
//     const [success, setSuccess] = useState(false);

//     useEffect(() => {
//         if (item) {
//             setFormData({
//                 ...item,
//                 customerPhoneNo: [...item.customerPhoneNo],
//             });
//         }
//     }, [item]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handlePhoneChange = (index, value) => {
//         const updatedPhones = [...formData.customerPhoneNo];
//         updatedPhones[index] = value;
//         setFormData({
//             ...formData,
//             customerPhoneNo: updatedPhones,
//         });
//     };

//     const addPhoneField = () => {
//         setFormData({
//             ...formData,
//             customerPhoneNo: [...formData.customerPhoneNo, ""],
//         });
//     };

//     const removePhoneField = (index) => {
//         const updatedPhones = [...formData.customerPhoneNo];
//         updatedPhones.splice(index, 1);
//         setFormData({
//             ...formData,
//             customerPhoneNo: updatedPhones,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await onSave(formData);
//             setSuccess(true);
//             // Optional: Close drawer after a delay
//             // setTimeout(() => onClose(), 1500);
//         } catch (error) {
//             console.error("Error saving customer data:", error);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setSuccess(false);
//     };

//     return (
//         <>
//             <Drawer
//                 anchor="right"
//                 open={open}
//                 onClose={onClose}
//                 sx={{
//                     "& .MuiDrawer-paper": {
//                         width: "400px",
//                         padding: "20px",
//                         boxSizing: "border-box",
//                     },
//                 }}
//             >
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                     <Typography variant="h6">Edit Customer</Typography>
//                     <IconButton onClick={onClose}>
//                         <MdClose />
//                     </IconButton>
//                 </Box>

//                 <Divider sx={{ mb: 3 }} />

//                 <form onSubmit={handleSubmit}>
//                     <Stack spacing={3}>
//                         <TextField
//                             name="customerCode"
//                             label="Customer Code"
//                             value={formData.customerCode}
//                             onChange={handleChange}
//                             fullWidth
//                             required
//                         />

//                         <TextField
//                             name="customerName"
//                             label="Customer Name"
//                             value={formData.customerName}
//                             onChange={handleChange}
//                             fullWidth
//                             required
//                         />

//                         <TextField
//                             name="customerEmail"
//                             label="Email"
//                             type="email"
//                             value={formData.customerEmail}
//                             onChange={handleChange}
//                             fullWidth
//                             required
//                         />

//                         <Box>
//                             <Typography variant="subtitle2" sx={{ mb: 1 }}>Phone Numbers</Typography>
//                             {formData.customerPhoneNo.map((phone, index) => (
//                                 <Box key={index} sx={{ display: "flex", mb: 1 }}>
//                                     <TextField
//                                         value={phone}
//                                         onChange={(e) => handlePhoneChange(index, e.target.value)}
//                                         fullWidth
//                                         label={`Phone ${index + 1}`}
//                                         sx={{ mr: 1 }}
//                                     />
//                                     <Button
//                                         variant="outlined"
//                                         color="error"
//                                         onClick={() => removePhoneField(index)}
//                                         disabled={formData.customerPhoneNo.length <= 1}
//                                     >
//                                         Remove
//                                     </Button>
//                                 </Box>
//                             ))}
//                             <Button
//                                 variant="outlined"
//                                 onClick={addPhoneField}
//                                 sx={{ mt: 1 }}
//                             >
//                                 Add Phone Number
//                             </Button>
//                         </Box>

//                         <TextField
//                             name="customerAddress"
//                             label="Address"
//                             value={formData.customerAddress}
//                             onChange={handleChange}
//                             fullWidth
//                             multiline
//                             rows={2}
//                         />

//                         <TextField
//                             name="customerNote"
//                             label="Notes"
//                             value={formData.customerNote}
//                             onChange={handleChange}
//                             fullWidth
//                             multiline
//                             rows={3}
//                         />

//                         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
//                             <Button variant="outlined" onClick={onClose}>
//                                 Cancel
//                             </Button>
//                             <Button type="submit" variant="contained" color="primary">
//                                 Save Changes
//                             </Button>
//                         </Box>
//                     </Stack>
//                 </form>
//             </Drawer>

//             <Snackbar
//                 open={success}
//                 autoHideDuration={4000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//             >
//                 <Alert
//                     onClose={handleCloseSnackbar}
//                     severity="success"
//                     variant="filled"
//                     sx={{ width: '100%' }}
//                 >
//                     Customer information updated successfully!
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// };

// export default EditDrawer;

import React, { useState, useEffect } from "react";
import {
    Drawer,
    TextField,
    Button,
    Typography,
    IconButton,
    Box,
    Divider,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material";
import { MdClose } from "react-icons/md";

const EditDrawer = ({ open, onClose, item, onSave }) => {
    const [formData, setFormData] = useState({
        customerId: "",
        customerName: "",
        customerEmail: "",
        customerPhoneNo: [""],
        customerAddress: "",
        customerNote: "",
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (item) {
            setFormData({
                ...item,
                customerPhoneNo: [...item.customerPhoneNo],
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (index, value) => {
        const updatedPhones = [...formData.customerPhoneNo];
        updatedPhones[index] = value;
        setFormData({
            ...formData,
            customerPhoneNo: updatedPhones,
        });
    };

    const addPhoneField = () => {
        setFormData({
            ...formData,
            customerPhoneNo: [...formData.customerPhoneNo, ""],
        });
    };

    const removePhoneField = (index) => {
        const updatedPhones = [...formData.customerPhoneNo];
        updatedPhones.splice(index, 1);
        setFormData({
            ...formData,
            customerPhoneNo: updatedPhones,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSave(formData);
            setSuccess(true);
        } catch (error) {
            console.error("Error saving customer data:", error);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: "400px",
                        padding: "20px",
                        boxSizing: "border-box",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Edit Customer</Typography>
                    <IconButton onClick={onClose}>
                        <MdClose />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            name="customerName"
                            label="Customer Name"
                            value={formData.customerName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            name="customerEmail"
                            label="Email"
                            type="email"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>Phone Numbers</Typography>
                            {formData.customerPhoneNo.map((phone, index) => (
                                <Box key={index} sx={{ display: "flex", mb: 1 }}>
                                    <TextField
                                        value={phone}
                                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                                        fullWidth
                                        label={`Phone ${index + 1}`}
                                        sx={{ mr: 1 }}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => removePhoneField(index)}
                                        disabled={formData.customerPhoneNo.length <= 1}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                onClick={addPhoneField}
                                sx={{ mt: 1 }}
                            >
                                Add Phone Number
                            </Button>
                        </Box>

                        <TextField
                            name="customerAddress"
                            label="Address"
                            value={formData.customerAddress}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={2}
                        />

                        <TextField
                            name="customerNote"
                            label="Notes"
                            value={formData.customerNote}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                        />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Drawer>

            <Snackbar
                open={success}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Customer information updated successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditDrawer;