// // // // // import {
// // // // //     IconButton,
// // // // //     Table,
// // // // //     TableBody,
// // // // //     TableCell,
// // // // //     TableContainer,
// // // // //     TableHead,
// // // // //     TableRow,
// // // // //     TextField,
// // // // //     Button,
// // // // //     Paper,
// // // // //     Typography,
// // // // // } from "@mui/material";
// // // // // import { MdEdit, MdDelete } from "react-icons/md";
// // // // // import EditDrawerCustomer from "./editDrawer.jsx";
// // // // // import { useState, useEffect } from "react";
// // // // // import axios from "axios";

// // // // // const CustomerList = () => {
// // // // //     const [customers, setCustomers] = useState([]);
// // // // //     const [drawerOpen, setDrawerOpen] = useState(false);
// // // // //     const [selectedCustomer, setSelectedCustomer] = useState(null);
// // // // //     const [search, setSearch] = useState("");
// // // // //     const [viewDetails, setViewDetails] = useState(false);

// // // // //     useEffect(() => {
// // // // //         fetchCustomers();
// // // // //     }, []);

// // // // //     const fetchCustomers = () => {
// // // // //         axios.get("http://localhost:8085/api/v1/customer/all")
// // // // //             .then(res => setCustomers(res.data))
// // // // //             .catch(err => console.error("Error fetching customers:", err));
// // // // //     };

// // // // //     const handleDeleteClick = (customerId) => {
// // // // //         // axios.delete(`http://localhost:8085/api/v1/customer/delete/${customerId}`)
// // // // //                 axios.delete(`http://localhost:8085/api/v1/customer/delete/${customerId}`)

// // // // //             .then(() => setCustomers(customers.filter(c => c.customerId !== customerId)))
// // // // //             .catch(err => console.error("Error deleting customer:", err));
// // // // //     };

// // // // //     const handleSave = (updatedCustomer) => {
// // // // //         axios.put(`http://localhost:8085/api/v1/customer/update/${updatedCustomer.customerId}`, updatedCustomer)
// // // // //             .then(() => {
// // // // //                 fetchCustomers();
// // // // //                 setDrawerOpen(false);
// // // // //             })
// // // // //             .catch(err => console.error("Error updating customer:", err));
// // // // //         setSelectedCustomer(null);
// // // // //     };

// // // // //     const handleSearch = (e) => {
// // // // //         setSearch(e.target.value);
// // // // //     };

// // // // //     const handleRowClick = (customer) => {
// // // // //         setSelectedCustomer(customer);
// // // // //         setViewDetails(true);
// // // // //     };

// // // // //     const handleBackClick = () => {
// // // // //         setViewDetails(false);
// // // // //         setSelectedCustomer(null);
// // // // //     };

// // // // //     const filteredCustomers = customers.filter(c =>
// // // // //         c.customerName.toLowerCase().includes(search.toLowerCase()) ||
// // // // //         c.customerCode.toLowerCase().includes(search.toLowerCase())
// // // // //     );

// // // // //     return (
// // // // //         <>
// // // // //             {viewDetails && selectedCustomer ? (
// // // // //                 <div className="p-4">
// // // // //                     <Button variant="contained" onClick={handleBackClick}>
// // // // //                         Back
// // // // //                     </Button>
// // // // //                     <Typography variant="h5" className="mt-4">Customer Details</Typography>
// // // // //                     <TableContainer component={Paper} className="mt-4">
// // // // //                         <Table>
// // // // //                             <TableBody>
// // // // //                                 {/* <TableRow><TableCell><b>Customer Code</b></TableCell><TableCell>{selectedCustomer.customerCode}</TableCell></TableRow> */}
// // // // //                                 <TableRow><TableCell><b>Name</b></TableCell><TableCell>{selectedCustomer.customerName}</TableCell></TableRow>
// // // // //                                 <TableRow><TableCell><b>Email</b></TableCell><TableCell>{selectedCustomer.email}</TableCell></TableRow>
// // // // //                                 <TableRow><TableCell><b>Phone Numbers</b></TableCell><TableCell>{selectedCustomer.phoneNumbers.join(", ")}</TableCell></TableRow>
// // // // //                                 <TableRow><TableCell><b>Address</b></TableCell><TableCell>{selectedCustomer.address}</TableCell></TableRow>
// // // // //                                 <TableRow><TableCell><b>Notes</b></TableCell><TableCell>{selectedCustomer.notes}</TableCell></TableRow>
// // // // //                             </TableBody>
// // // // //                         </Table>
// // // // //                     </TableContainer>
// // // // //                 </div>
// // // // //             ) : (
// // // // //                 <>
// // // // //                     <div className="flex flex-col w-full p-4">
// // // // //                         <TextField
// // // // //                             label="Search by Name or Code"
// // // // //                             value={search}
// // // // //                             onChange={handleSearch}
// // // // //                             fullWidth
// // // // //                             margin="normal"
// // // // //                         />
// // // // //                     </div>
// // // // //                     <TableContainer component={Paper}>
// // // // //                         <Table>
// // // // //                             <TableHead>
// // // // //                                 <TableRow style={{ backgroundColor: "#f5f5f5" }}>
// // // // //                                     <TableCell><b>NO</b></TableCell>
// // // // //                                     {/* <TableCell><b>CODE</b></TableCell> */}
// // // // //                                     <TableCell><b>NAME</b></TableCell>
// // // // //                                     <TableCell><b>EMAIL</b></TableCell>
// // // // //                                     <TableCell><b>PHONE</b></TableCell>
// // // // //                                     <TableCell align="center"><b>ACTIONS</b></TableCell>
// // // // //                                 </TableRow>
// // // // //                             </TableHead>
// // // // //                             <TableBody>
// // // // //                                 {filteredCustomers.map((customer, index) => (
// // // // //                                     <TableRow
// // // // //                                         key={customer.customerId}
// // // // //                                         hover
// // // // //                                         onClick={() => handleRowClick(customer)}
// // // // //                                         style={{ cursor: "pointer" }}
// // // // //                                     >
// // // // //                                         <TableCell>{index + 1}</TableCell>
// // // // //                                         {/* <TableCell>{customer.customerCode}</TableCell> */}
// // // // //                                         <TableCell>{customer.customerName}</TableCell>
// // // // //                                         <TableCell>{customer.email}</TableCell>
// // // // //                                         <TableCell>{customer.phoneNumbers.join(", ")}</TableCell>
// // // // //                                         <TableCell align="center">
// // // // //                                             <IconButton
// // // // //                                                 color="info"
// // // // //                                                 onClick={(e) => {
// // // // //                                                     e.stopPropagation();
// // // // //                                                     setSelectedCustomer(customer);
// // // // //                                                     setDrawerOpen(true);
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 <MdEdit />
// // // // //                                             </IconButton>
// // // // //                                             <IconButton
// // // // //                                                 color="error"
// // // // //                                                 onClick={(e) => {
// // // // //                                                     e.stopPropagation();
// // // // //                                                     handleDeleteClick(customer.customerId);
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 <MdDelete />
// // // // //                                             </IconButton>
// // // // //                                         </TableCell>
// // // // //                                     </TableRow>
// // // // //                                 ))}
// // // // //                             </TableBody>
// // // // //                         </Table>
// // // // //                     </TableContainer>
// // // // //                 </>
// // // // //             )}
// // // // //             {selectedCustomer && (
// // // // //                 <EditDrawerCustomer
// // // // //                     open={drawerOpen}
// // // // //                     onClose={() => {
// // // // //                         setDrawerOpen(false);
// // // // //                         setSelectedCustomer(null);
// // // // //                     }}
// // // // //                     item={selectedCustomer}
// // // // //                     onSave={handleSave}
// // // // //                 />
// // // // //             )}
// // // // //         </>
// // // // //     );
// // // // // };

// // // // // export default CustomerList;


// // // // // CustomerList.jsx
// // // // import {
// // // //     IconButton,
// // // //     Table,
// // // //     TableBody,
// // // //     TableCell,
// // // //     TableContainer,
// // // //     TableHead,
// // // //     TableRow,
// // // //     TextField,
// // // //     Button,
// // // //     Paper,
// // // //     Typography,
// // // // } from "@mui/material";
// // // // import { MdEdit, MdDelete } from "react-icons/md";
// // // // import EditDrawerCustomer from "./editDrawer.jsx";
// // // // import { useState, useEffect } from "react";
// // // // import axios from "axios";

// // // // const CustomerList = () => {
// // // //     const [customers, setCustomers] = useState([]);
// // // //     const [drawerOpen, setDrawerOpen] = useState(false);
// // // //     const [selectedCustomer, setSelectedCustomer] = useState(null);
// // // //     const [search, setSearch] = useState("");
// // // //     const [viewDetails, setViewDetails] = useState(false);

// // // //     useEffect(() => {
// // // //         fetchCustomers();
// // // //     }, []);

// // // //     const fetchCustomers = async () => {
// // // //         try {
// // // //             const response = await axios.get("http://localhost:8085/api/v1/customer/all");
// // // //             setCustomers(response.data);
// // // //         } catch (err) {
// // // //             console.error("Error fetching customers:", err);
// // // //         }
// // // //     };

// // // //     const handleDeleteClick = async (customerId) => {
// // // //         try {
// // // //             await axios.delete(`http://localhost:8085/api/v1/customer/delete/${customerId}`);
// // // //             setCustomers(customers.filter(c => c.customerId !== customerId));
// // // //         } catch (err) {
// // // //             console.error("Error deleting customer:", err);
// // // //         }
// // // //     };

// // // //     const handleSave = async (updatedCustomer) => {
// // // //         try {
// // // //             await axios.put(
// // // //                 `http://localhost:8085/api/v1/customer/update/${updatedCustomer.customerId}`,
// // // //                 updatedCustomer
// // // //             );
// // // //             await fetchCustomers();
// // // //             setDrawerOpen(false);
// // // //             setSelectedCustomer(null);
// // // //         } catch (err) {
// // // //             console.error("Error updating customer:", err);
// // // //         }
// // // //     };

// // // //     const handleSearch = (e) => {
// // // //         setSearch(e.target.value);
// // // //     };

// // // //     const handleRowClick = (customer) => {
// // // //         setSelectedCustomer(customer);
// // // //         setViewDetails(true);
// // // //     };

// // // //     const handleBackClick = () => {
// // // //         setViewDetails(false);
// // // //         setSelectedCustomer(null);
// // // //     };

// // // //     const filteredCustomers = customers.filter(c =>
// // // //         (c.customerName?.toLowerCase() || "").includes(search.toLowerCase()) ||
// // // //         (c.customerCode?.toLowerCase() || "").includes(search.toLowerCase())
// // // //     );

// // // //     return (
// // // //         <>
// // // //             {viewDetails && selectedCustomer ? (
// // // //                 <div className="p-4">
// // // //                     <Button variant="contained" onClick={handleBackClick}>
// // // //                         Back
// // // //                     </Button>
// // // //                     <Typography variant="h5" className="mt-4">Customer Details</Typography>
// // // //                     <TableContainer component={Paper} className="mt-4">
// // // //                         <Table>
// // // //                             <TableBody>
// // // //                                 <TableRow>
// // // //                                     <TableCell><b>Name</b></TableCell>
// // // //                                     <TableCell>{selectedCustomer.customerName}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell><b>Email</b></TableCell>
// // // //                                     <TableCell>{selectedCustomer.email}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell><b>Phone Numbers</b></TableCell>
// // // //                                     <TableCell>{selectedCustomer.phoneNumbers?.join(", ") || ""}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell><b>Address</b></TableCell>
// // // //                                     <TableCell>{selectedCustomer.address}</TableCell>
// // // //                                 </TableRow>
// // // //                                 <TableRow>
// // // //                                     <TableCell><b>Notes</b></TableCell>
// // // //                                     <TableCell>{selectedCustomer.notes}</TableCell>
// // // //                                 </TableRow>
// // // //                             </TableBody>
// // // //                         </Table>
// // // //                     </TableContainer>
// // // //                 </div>
// // // //             ) : (
// // // //                 <>
// // // //                     <div className="flex flex-col w-full p-4">
// // // //                         <TextField
// // // //                             label="Search by Name or Code"
// // // //                             value={search}
// // // //                             onChange={handleSearch}
// // // //                             fullWidth
// // // //                             margin="normal"
// // // //                         />
// // // //                     </div>
// // // //                     <TableContainer component={Paper}>
// // // //                         <Table>
// // // //                             <TableHead>
// // // //                                 <TableRow style={{ backgroundColor: "#f5f5f5" }}>
// // // //                                     <TableCell><b>NO</b></TableCell>
// // // //                                     <TableCell><b>NAME</b></TableCell>
// // // //                                     <TableCell><b>EMAIL</b></TableCell>
// // // //                                     <TableCell><b>PHONE</b></TableCell>
// // // //                                     <TableCell align="center"><b>ACTIONS</b></TableCell>
// // // //                                 </TableRow>
// // // //                             </TableHead>
// // // //                             <TableBody>
// // // //                                 {filteredCustomers.map((customer, index) => (
// // // //                                     <TableRow
// // // //                                         key={customer.customerId}
// // // //                                         hover
// // // //                                         onClick={() => handleRowClick(customer)}
// // // //                                         style={{ cursor: "pointer" }}
// // // //                                     >
// // // //                                         <TableCell>{index + 1}</TableCell>
// // // //                                         <TableCell>{customer.customerName}</TableCell>
// // // //                                         <TableCell>{customer.email}</TableCell>
// // // //                                         <TableCell>{customer.phoneNumbers?.join(", ") || ""}</TableCell>
// // // //                                         <TableCell align="center">
// // // //                                             <IconButton
// // // //                                                 color="info"
// // // //                                                 onClick={(e) => {
// // // //                                                     e.stopPropagation();
// // // //                                                     setSelectedCustomer(customer);
// // // //                                                     setDrawerOpen(true);
// // // //                                                 }}
// // // //                                             >
// // // //                                                 <MdEdit />
// // // //                                             </IconButton>
// // // //                                             <IconButton
// // // //                                                 color="error"
// // // //                                                 onClick={(e) => {
// // // //                                                     e.stopPropagation();
// // // //                                                     handleDeleteClick(customer.customerId);
// // // //                                                 }}
// // // //                                             >
// // // //                                                 <MdDelete />
// // // //                                             </IconButton>
// // // //                                         </TableCell>
// // // //                                     </TableRow>
// // // //                                 ))}
// // // //                             </TableBody>
// // // //                         </Table>
// // // //                     </TableContainer>
// // // //                 </>
// // // //             )}
// // // //             {selectedCustomer && (
// // // //                 <EditDrawerCustomer
// // // //                     open={drawerOpen}
// // // //                     onClose={() => {
// // // //                         setDrawerOpen(false);
// // // //                         setSelectedCustomer(null);
// // // //                     }}
// // // //                     item={selectedCustomer}
// // // //                     onSave={handleSave}
// // // //                 />
// // // //             )}
// // // //         </>
// // // //     );
// // // // };

// // // // export default CustomerList;

// // // // CustomerList.jsx
// // // import {
// // //     IconButton,
// // //     Table,
// // //     TableBody,
// // //     TableCell,
// // //     TableContainer,
// // //     TableHead,
// // //     TableRow,
// // //     TextField,
// // //     Button,
// // //     Paper,
// // //     Typography,
// // // } from "@mui/material";
// // // import { MdEdit, MdDelete } from "react-icons/md";
// // // import EditDrawerCustomer from "./editDrawer.jsx";
// // // import { useState, useEffect } from "react";
// // // import axios from "axios";

// // // const CustomerList = () => {
// // //     const [customers, setCustomers] = useState([]);
// // //     const [drawerOpen, setDrawerOpen] = useState(false);
// // //     const [selectedCustomer, setSelectedCustomer] = useState(null);
// // //     const [search, setSearch] = useState("");
// // //     const [viewDetails, setViewDetails] = useState(false);

// // //     useEffect(() => {
// // //         fetchCustomers();
// // //     }, []);

// // //     const fetchCustomers = async () => {
// // //         try {
// // //             const response = await axios.get("http://localhost:8085/api/v1/customer/all");
// // //             setCustomers(response.data);
// // //         } catch (err) {
// // //             console.error("Error fetching customers:", err);
// // //         }
// // //     };

// // //     const handleDeleteClick = async (customerId) => {
// // //         try {
// // //             await axios.delete(`http://localhost:8085/api/v1/customer/delete/${customerId}`);
// // //             setCustomers(customers.filter(c => c.customerId !== customerId));
// // //         } catch (err) {
// // //             console.error("Error deleting customer:", err);
// // //         }
// // //     };

// // //     const handleSave = async (updatedCustomer) => {
// // //         try {
// // //             console.log("Updating customer with ID:", updatedCustomer.customerId);
// // //             console.log("Payload:", updatedCustomer);
// // //             const response = await axios.put(
// // //                 `http://localhost:8085/api/v1/customer/update/${updatedCustomer.customerId}`,
// // //                 updatedCustomer,
// // //                 {
// // //                     headers: {
// // //                         'Content-Type': 'application/json',
// // //                     }
// // //                 }
// // //             );
// // //             console.log("Update response:", response.data);
// // //             await fetchCustomers();
// // //             setDrawerOpen(false);
// // //             setSelectedCustomer(null);
// // //         } catch (err) {
// // //             console.error("Error updating customer:", err);
// // //             if (err.response) {
// // //                 console.error("Response data:", err.response.data);
// // //                 console.error("Response status:", err.response.status);
// // //             }
// // //         }
// // //     };

// // //     const handleSearch = (e) => {
// // //         setSearch(e.target.value);
// // //     };

// // //     const handleRowClick = (customer) => {
// // //         setSelectedCustomer(customer);
// // //         setViewDetails(true);
// // //     };

// // //     const handleBackClick = () => {
// // //         setViewDetails(false);
// // //         setSelectedCustomer(null);
// // //     };

// // //     const filteredCustomers = customers.filter(c =>
// // //         (c.customerName?.toLowerCase() || "").includes(search.toLowerCase()) ||
// // //         (c.customerCode?.toLowerCase() || "").includes(search.toLowerCase())
// // //     );

// // //     return (
// // //         <>
// // //             {viewDetails && selectedCustomer ? (
// // //                 <div className="p-4">
// // //                     <Button variant="contained" onClick={handleBackClick}>
// // //                         Back
// // //                     </Button>
// // //                     <Typography variant="h5" className="mt-4">Customer Details</Typography>
// // //                     <TableContainer component={Paper} className="mt-4">
// // //                         <Table>
// // //                             <TableBody>
// // //                                 <TableRow>
// // //                                     <TableCell><b>Name</b></TableCell>
// // //                                     <TableCell>{selectedCustomer.customerName}</TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell><b>Email</b></TableCell>
// // //                                     <TableCell>{selectedCustomer.email}</TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell><b>Phone Numbers</b></TableCell>
// // //                                     <TableCell>{selectedCustomer.phoneNumbers?.join(", ") || ""}</TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell><b>Address</b></TableCell>
// // //                                     <TableCell>{selectedCustomer.address}</TableCell>
// // //                                 </TableRow>
// // //                                 <TableRow>
// // //                                     <TableCell><b>Notes</b></TableCell>
// // //                                     <TableCell>{selectedCustomer.notes}</TableCell>
// // //                                 </TableRow>
// // //                             </TableBody>
// // //                         </Table>
// // //                     </TableContainer>
// // //                 </div>
// // //             ) : (
// // //                 <>
// // //                     <div className="flex flex-col w-full p-4">
// // //                         <TextField
// // //                             label="Search by Name or Code"
// // //                             value={search}
// // //                             onChange={handleSearch}
// // //                             fullWidth
// // //                             margin="normal"
// // //                         />
// // //                     </div>
// // //                     <TableContainer component={Paper}>
// // //                         <Table>
// // //                             <TableHead>
// // //                                 <TableRow style={{ backgroundColor: "#f5f5f5" }}>
// // //                                     <TableCell><b>NO</b></TableCell>
// // //                                     <TableCell><b>NAME</b></TableCell>
// // //                                     <TableCell><b>EMAIL</b></TableCell>
// // //                                     <TableCell><b>PHONE</b></TableCell>
// // //                                     <TableCell align="center"><b>ACTIONS</b></TableCell>
// // //                                 </TableRow>
// // //                             </TableHead>
// // //                             <TableBody>
// // //                                 {filteredCustomers.map((customer, index) => (
// // //                                     <TableRow
// // //                                         key={customer.customerId}
// // //                                         hover
// // //                                         onClick={() => handleRowClick(customer)}
// // //                                         style={{ cursor: "pointer" }}
// // //                                     >
// // //                                         <TableCell>{index + 1}</TableCell>
// // //                                         <TableCell>{customer.customerName}</TableCell>
// // //                                         <TableCell>{customer.email}</TableCell>
// // //                                         <TableCell>{customer.phoneNumbers?.join(", ") || ""}</TableCell>
// // //                                         <TableCell align="center">
// // //                                             <IconButton
// // //                                                 color="info"
// // //                                                 onClick={(e) => {
// // //                                                     e.stopPropagation();
// // //                                                     setSelectedCustomer(customer);
// // //                                                     setDrawerOpen(true);
// // //                                                 }}
// // //                                             >
// // //                                                 <MdEdit />
// // //                                             </IconButton>
// // //                                             <IconButton
// // //                                                 color="error"
// // //                                                 onClick={(e) => {
// // //                                                     e.stopPropagation();
// // //                                                     handleDeleteClick(customer.customerId);
// // //                                                 }}
// // //                                             >
// // //                                                 <MdDelete />
// // //                                             </IconButton>
// // //                                         </TableCell>
// // //                                     </TableRow>
// // //                                 ))}
// // //                             </TableBody>
// // //                         </Table>
// // //                     </TableContainer>
// // //                 </>
// // //             )}
// // //             {selectedCustomer && (
// // //                 <EditDrawerCustomer
// // //                     open={drawerOpen}
// // //                     onClose={() => {
// // //                         setDrawerOpen(false);
// // //                         setSelectedCustomer(null);
// // //                     }}
// // //                     item={selectedCustomer}
// // //                     onSave={handleSave}
// // //                 />
// // //             )}
// // //         </>
// // //     );
// // // };

// // // export default CustomerList;


// // import {
// //     IconButton,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     TextField,
// //     Button,
// //     Paper,
// //     Typography,
// // } from "@mui/material";
// // import { MdEdit, MdDelete } from "react-icons/md";
// // import EditDrawerCustomer from "./editDrawer.jsx";
// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // const CustomerList = () => {
// //     const [customers, setCustomers] = useState([]);
// //     const [drawerOpen, setDrawerOpen] = useState(false);
// //     const [selectedCustomer, setSelectedCustomer] = useState(null);
// //     const [search, setSearch] = useState("");
// //     const [viewDetails, setViewDetails] = useState(false);

// //     useEffect(() => {
// //         fetchCustomers();
// //     }, []);

// //     const fetchCustomers = async () => {
// //         try {
// //             const response = await axios.get("http://localhost:8085/api/v1/customer/all");
// //             setCustomers(response.data);
// //         } catch (err) {
// //             console.error("Error fetching customers:", err);
// //         }
// //     };

// //     const handleDeleteClick = async (customerId) => {
// //         try {
// //             await axios.delete(`http://localhost:8085/api/v1/customer/delete/${customerId}`);
// //             setCustomers(customers.filter(c => c.customerId !== customerId));
// //         } catch (err) {
// //             console.error("Error deleting customer:", err);
// //         }
// //     };

// //     const handleSave = async (updatedCustomer) => {
// //         try {
// //             const { customerId, ...customerData } = updatedCustomer;
// //             const response = await axios.put(
// //                 `http://localhost:8085/api/v1/customer/update/${customerId}`,
// //                 customerData,
// //                 {
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                     }
// //                 }
// //             );
// //             console.log("Update response:", response.data);
// //             await fetchCustomers();
// //             setDrawerOpen(false);
// //             setSelectedCustomer(null);
// //         } catch (err) {
// //             console.error("Error updating customer:", err);
// //             if (err.response) {
// //                 console.error("Response data:", err.response.data);
// //                 console.error("Response status:", err.response.status);
// //             }
// //         }
// //     };

// //     const handleSearch = (e) => {
// //         setSearch(e.target.value);
// //     };

// //     const handleRowClick = (customer) => {
// //         setSelectedCustomer(customer);
// //         setViewDetails(true);
// //     };

// //     const handleBackClick = () => {
// //         setViewDetails(false);
// //         setSelectedCustomer(null);
// //     };

// //     const filteredCustomers = customers.filter(c =>
// //         (c.customerName?.toLowerCase() || "").includes(search.toLowerCase()) ||
// //         (c.customerCode?.toLowerCase() || "").includes(search.toLowerCase())
// //     );

// //     return (
// //         <>
// //             {viewDetails && selectedCustomer ? (
// //                 <div className="p-4">
// //                     <Button variant="contained" onClick={handleBackClick}>
// //                         Back
// //                     </Button>
// //                     <Typography variant="h5" className="mt-4">Customer Details</Typography>
// //                     <TableContainer component={Paper} className="mt-4">
// //                         <Table>
// //                             <TableBody>
// //                                 <TableRow>
// //                                     <TableCell><b>Name</b></TableCell>
// //                                     <TableCell>{selectedCustomer.customerName}</TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell><b>Email</b></TableCell>
// //                                     <TableCell>{selectedCustomer.email}</TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell><b>Phone Numbers</b></TableCell>
// //                                     <TableCell>{selectedCustomer.phoneNumbers?.join(", ") || ""}</TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell><b>Address</b></TableCell>
// //                                     <TableCell>{selectedCustomer.address}</TableCell>
// //                                 </TableRow>
// //                                 <TableRow>
// //                                     <TableCell><b>Notes</b></TableCell>
// //                                     <TableCell>{selectedCustomer.notes}</TableCell>
// //                                 </TableRow>
// //                             </TableBody>
// //                         </Table>
// //                     </TableContainer>
// //                 </div>
// //             ) : (
// //                 <>
// //                     <div className="flex flex-col w-full p-4">
// //                         <TextField
// //                             label="Search by Name or Code"
// //                             value={search}
// //                             onChange={handleSearch}
// //                             fullWidth
// //                             margin="normal"
// //                         />
// //                     </div>
// //                     <TableContainer component={Paper}>
// //                         <Table>
// //                             <TableHead>
// //                                 <TableRow style={{ backgroundColor: "#f5f5f5" }}>
// //                                     <TableCell><b>NO</b></TableCell>
// //                                     <TableCell><b>NAME</b></TableCell>
// //                                     <TableCell><b>EMAIL</b></TableCell>
// //                                     <TableCell><b>PHONE</b></TableCell>
// //                                     <TableCell align="center"><b>ACTIONS</b></TableCell>
// //                                 </TableRow>
// //                             </TableHead>
// //                             <TableBody>
// //                                 {filteredCustomers.map((customer, index) => (
// //                                     <TableRow
// //                                         key={customer.customerId}
// //                                         hover
// //                                         onClick={() => handleRowClick(customer)}
// //                                         style={{ cursor: "pointer" }}
// //                                     >
// //                                         <TableCell>{index + 1}</TableCell>
// //                                         <TableCell>{customer.customerName}</TableCell>
// //                                         <TableCell>{customer.email}</TableCell>
// //                                         <TableCell>{customer.phoneNumbers?.join(", ") || ""}</TableCell>
// //                                         <TableCell align="center">
// //                                             <IconButton
// //                                                 color="info"
// //                                                 onClick={(e) => {
// //                                                     e.stopPropagation();
// //                                                     setSelectedCustomer(customer);
// //                                                     setDrawerOpen(true);
// //                                                 }}
// //                                             >
// //                                                 <MdEdit />
// //                                             </IconButton>
// //                                             <IconButton
// //                                                 color="error"
// //                                                 onClick={(e) => {
// //                                                     e.stopPropagation();
// //                                                     handleDeleteClick(customer.customerId);
// //                                                 }}
// //                                             >
// //                                                 <MdDelete />
// //                                             </IconButton>
// //                                         </TableCell>
// //                                     </TableRow>
// //                                 ))}
// //                             </TableBody>
// //                         </Table>
// //                     </TableContainer>
// //                 </>
// //             )}
// //             {selectedCustomer && (
// //                 <EditDrawerCustomer
// //                     open={drawerOpen}
// //                     onClose={() => {
// //                         setDrawerOpen(false);
// //                         setSelectedCustomer(null);
// //                     }}
// //                     item={selectedCustomer}
// //                     onSave={handleSave}
// //                 />
// //             )}
// //         </>
// //     );
// // };

// // export default CustomerList;




// import {
//     IconButton,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Button,
//     Paper,
//     Typography,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogContentText,
//     DialogActions,
// } from "@mui/material";
// import { MdEdit, MdDelete } from "react-icons/md";
// import EditDrawer from "./editDrawer.jsx";

// import { useState, useEffect } from "react";
// import axios from "axios";

// const CustomerList = () => {
//     const [customers, setCustomers] = useState([]);
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [search, setSearch] = useState("");
//     const [viewDetails, setViewDetails] = useState(false);
    
//     // Add states for delete confirmation
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [customerToDelete, setCustomerToDelete] = useState(null);

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     const fetchCustomers = () => {
//         axios.get("http://localhost:8085/api/v1/customer/all")
//             .then((response) => {
//                 // Map backend fields to frontend structure
//                 const formattedCustomers = response.data.map(customer => ({
//                     customerId: customer.id,
//                     customerCode: customer.customerCode,
//                     customerName: customer.customerName,
//                     customerEmail: customer.email,
//                     customerPhoneNo: customer.phoneNumbers,
//                     customerAddress: customer.address,
//                     customerNote: customer.notes
//                 }));
//                 setCustomers(formattedCustomers);
//             })
//             .catch((error) => {
//                 console.error("Error fetching customers:", error);
//                 alert("Failed to load customers");
//             });
//     };

//     const handleEditClick = (customer) => {
//         setSelectedCustomer(customer);
//         setDrawerOpen(true);
//     };

//     // Modified to show confirmation dialog
//     const handleDeleteClick = (customer) => {
//         setCustomerToDelete(customer);
//         setDeleteDialogOpen(true);
//     };

//     // New function to handle actual deletion after confirmation
//     const confirmDelete = () => {
//         if (!customerToDelete) return;
        
//         axios
//             .delete(`http://localhost:8085/api/v1/customer/delete/${customerToDelete.customerId}`)
//             .then(() => {
//                 setCustomers(customers.filter((c) => c.customerId !== customerToDelete.customerId));
//                 setDeleteDialogOpen(false);
//                 setCustomerToDelete(null);
//             })
//             .catch((error) => {
//                 console.error("Error deleting customer:", error);
//                 fetchCustomers(); // Refresh if there's an error
//                 setDeleteDialogOpen(false);
//                 setCustomerToDelete(null);
//             });
//     };

//     // Cancel deletion
//     const cancelDelete = () => {
//         setDeleteDialogOpen(false);
//         setCustomerToDelete(null);
//     };

//     const handleDrawerClose = () => {
//         setDrawerOpen(false);
//         setSelectedCustomer(null);
//     };

//     const handleSave = (updatedCustomer) => {
//         // Prepare data in backend DTO format
//         const backendData = {
//             customerCode: updatedCustomer.customerCode,
//             customerName: updatedCustomer.customerName,
//             email: updatedCustomer.customerEmail,
//             phoneNumbers: updatedCustomer.customerPhoneNo,
//             address: updatedCustomer.customerAddress,
//             notes: updatedCustomer.customerNote
//         };

//         axios.put(`http://localhost:8085/api/v1/customer/update/${updatedCustomer.customerId}`, backendData)
//             .then(() => {
//                 fetchCustomers(); // Refresh list after update
//                 setDrawerOpen(false);
//             })
//             .catch((error) => {
//                 console.error("Error updating customer:", error);
//             });
//     };

//     const handleSearch = (event) => {
//         setSearch(event.target.value);
//     };

//     const handleRowClick = (customer) => {
//         setSelectedCustomer(customer);
//         setViewDetails(true);
//     };

//     const handleBackClick = () => {
//         setViewDetails(false);
//         setSelectedCustomer(null);
//     };

//     const filteredCustomers = customers.filter((customer) =>
//         customer.customerName.toLowerCase().includes(search.toLowerCase()) ||
//         customer.customerCode.toLowerCase().includes(search.toLowerCase())
//     );

//     const headerStyle = {
//         backgroundColor: "#f5f5f5",
//         fontWeight: "bold",
//     };

//     return (
//         <>
//             {viewDetails && selectedCustomer ? (
//                 <div className="p-4">
//                     <Button variant="contained" color="primary" onClick={handleBackClick}>
//                         Back
//                     </Button>
//                     <Typography variant="h5" className="mt-4">
//                         Customer Details
//                     </Typography>
//                     <TableContainer component={Paper} className="mt-4">
//                         <Table>
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell><b>Customer Code</b></TableCell>
//                                     <TableCell>{selectedCustomer.customerCode}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell><b>Name</b></TableCell>
//                                     <TableCell>{selectedCustomer.customerName}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell><b>Email</b></TableCell>
//                                     <TableCell>{selectedCustomer.customerEmail}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell><b>Phone Number</b></TableCell>
//                                     <TableCell>{selectedCustomer.customerPhoneNo.join(", ")}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell><b>Address</b></TableCell>
//                                     <TableCell>{selectedCustomer.customerAddress}</TableCell>
//                                 </TableRow>
//                                 <TableRow>
//                                     <TableCell><b>Notes</b></TableCell>
//                                     <TableCell>{selectedCustomer.customerNote}</TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </div>
//             ) : (
//                 <>
//                     <div className="flex flex-col w-full p-4 border-collapse">
//                         <h1 className="text-xl">Search</h1>
//                         <TextField
//                             id="search"
//                             label="Search by Name or Customer Code"
//                             variant="outlined"
//                             value={search}
//                             onChange={handleSearch}
//                             fullWidth
//                             margin="normal"
//                         />
//                     </div>

//                     <TableContainer>
//                         <Table>
//                             <TableHead style={headerStyle}>
//                                 <TableRow>
//                                     <TableCell style={headerStyle}><b>NO</b></TableCell>
//                                     <TableCell style={headerStyle}><b>CUSTOMER CODE</b></TableCell>
//                                     <TableCell style={headerStyle}><b>NAME</b></TableCell>
//                                     <TableCell style={headerStyle}><b>EMAIL</b></TableCell>
//                                     <TableCell style={headerStyle}><b>PHONE NUMBER</b></TableCell>
//                                     <TableCell align="center" style={headerStyle}><b>ACTION</b></TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredCustomers.map((customer, index) => (
//                                     <TableRow
//                                         key={customer.customerId}
//                                         onClick={() => handleRowClick(customer)}
//                                         style={{ cursor: "pointer" }}
//                                         hover
//                                     >
//                                         <TableCell>{index + 1}</TableCell>
//                                         <TableCell>{customer.customerCode}</TableCell>
//                                         <TableCell>{customer.customerName}</TableCell>
//                                         <TableCell>{customer.customerEmail}</TableCell>
//                                         <TableCell>{customer.customerPhoneNo.join(", ")}</TableCell>
//                                         <TableCell align="center">
//                                             <IconButton
//                                                 color="info"
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleEditClick(customer);
//                                                 }}
//                                             >
//                                                 <MdEdit />
//                                             </IconButton>
//                                             <IconButton
//                                                 color="error"
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleDeleteClick(customer);
//                                                 }}
//                                             >
//                                                 <MdDelete />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </>
//             )}
            
//             {/* Delete Confirmation Dialog */}
//             <Dialog
//                 open={deleteDialogOpen}
//                 onClose={cancelDelete}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title" className="bg-red-50 text-red-700">
//                     Confirm Customer Deletion
//                 </DialogTitle>
//                 <DialogContent className="mt-4">
//                     <DialogContentText id="alert-dialog-description">
//                         <div className="flex items-center mb-4">
//                             <div className="bg-red-100 p-2 rounded-full mr-3">
//                                 <MdDelete className="text-red-600 text-xl" />
//                             </div>
//                             <span className="font-semibold">
//                                 You are about to delete a customer record
//                             </span>
//                         </div>
                        
//                         <p className="mb-4">
//                             Are you sure you want to delete customer <span className="font-bold">{customerToDelete?.customerName}</span> ({customerToDelete?.customerCode})?
//                         </p>
                        
//                         <div className="bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
//                             <p className="text-yellow-800">
//                                 Warning: This action cannot be undone. All data associated with this customer will be permanently removed from the system.
//                             </p>
//                         </div>
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions className="p-4 flex justify-end space-x-2">
//                     <Button 
//                         onClick={cancelDelete} 
//                         variant="outlined"
//                         className="px-4 py-2"
//                     >
//                         Cancel
//                     </Button>
//                     <Button 
//                         onClick={confirmDelete} 
//                         variant="contained" 
//                         color="error" 
//                         className="px-4 py-2"
//                         autoFocus
//                     >
//                         Delete Customer
//                     </Button>
//                 </DialogActions>
//             </Dialog>
            
//             {selectedCustomer && (
//                 <EditDrawer
//                     open={drawerOpen}
//                     onClose={handleDrawerClose}
//                     item={selectedCustomer}
//                     onSave={handleSave}
//                 />
//             )}
//         </>
//     );
// };

// export default CustomerList;


import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import EditDrawer from "./editDrawer.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [search, setSearch] = useState("");
    const [viewDetails, setViewDetails] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get("http://localhost:8085/api/v1/customer/all")
            .then((response) => {
                const formattedCustomers = response.data.map(customer => ({
                    customerId: customer.id,
                    customerName: customer.customerName,
                    customerEmail: customer.email,
                    customerPhoneNo: customer.phoneNumbers,
                    customerAddress: customer.address,
                    customerNote: customer.notes
                }));
                setCustomers(formattedCustomers);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
                alert("Failed to load customers");
            });
    };

    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
        setDrawerOpen(true);
    };

    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!customerToDelete) return;
        
        axios
            .delete(`http://localhost:8085/api/v1/customer/delete/${customerToDelete.customerId}`)
            .then(() => {
                setCustomers(customers.filter((c) => c.customerId !== customerToDelete.customerId));
                setDeleteDialogOpen(false);
                setCustomerToDelete(null);
            })
            .catch((error) => {
                console.error("Error deleting customer:", error);
                fetchCustomers();
                setDeleteDialogOpen(false);
                setCustomerToDelete(null);
            });
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedCustomer(null);
    };

    const handleSave = (updatedCustomer) => {
        const backendData = {
            customerName: updatedCustomer.customerName,
            email: updatedCustomer.customerEmail,
            phoneNumbers: updatedCustomer.customerPhoneNo,
            address: updatedCustomer.customerAddress,
            notes: updatedCustomer.customerNote
        };

        axios.put(`http://localhost:8085/api/v1/customer/update/${updatedCustomer.customerId}`, backendData)
            .then(() => {
                fetchCustomers();
                setDrawerOpen(false);
            })
            .catch((error) => {
                console.error("Error updating customer:", error);
            });
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleRowClick = (customer) => {
        setSelectedCustomer(customer);
        setViewDetails(true);
    };

    const handleBackClick = () => {
        setViewDetails(false);
        setSelectedCustomer(null);
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.customerName.toLowerCase().includes(search.toLowerCase())
    );

    const headerStyle = {
        backgroundColor: "#f5f5f5",
        fontWeight: "bold",
    };

    return (
        <>
            {viewDetails && selectedCustomer ? (
                <div className="p-4">
                    <Button variant="contained" color="primary" onClick={handleBackClick}>
                        Back
                    </Button>
                    <Typography variant="h5" className="mt-4">
                        Customer Details
                    </Typography>
                    <TableContainer component={Paper} className="mt-4">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell>{selectedCustomer.customerName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Email</b></TableCell>
                                    <TableCell>{selectedCustomer.customerEmail}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Phone Number</b></TableCell>
                                    <TableCell>{selectedCustomer.customerPhoneNo.join(", ")}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Address</b></TableCell>
                                    <TableCell>{selectedCustomer.customerAddress}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Notes</b></TableCell>
                                    <TableCell>{selectedCustomer.customerNote}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <>
                    <div className="flex flex-col w-full p-4 border-collapse">
                        <h1 className="text-xl">Search</h1>
                        <TextField
                            id="search"
                            label="Search by Name"
                            variant="outlined"
                            value={search}
                            onChange={handleSearch}
                            fullWidth
                            margin="normal"
                        />
                    </div>

                    <TableContainer>
                        <Table>
                            <TableHead style={headerStyle}>
                                <TableRow>
                                    <TableCell style={headerStyle}><b>NO</b></TableCell>
                                    <TableCell style={headerStyle}><b>NAME</b></TableCell>
                                    <TableCell style={headerStyle}><b>EMAIL</b></TableCell>
                                    <TableCell style={headerStyle}><b>PHONE NUMBER</b></TableCell>
                                    <TableCell align="center" style={headerStyle}><b>ACTION</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCustomers.map((customer, index) => (
                                    <TableRow
                                        key={customer.customerId}
                                        onClick={() => handleRowClick(customer)}
                                        style={{ cursor: "pointer" }}
                                        hover
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{customer.customerName}</TableCell>
                                        <TableCell>{customer.customerEmail}</TableCell>
                                        <TableCell>{customer.customerPhoneNo.join(", ")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="info"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(customer);
                                                }}
                                            >
                                                <MdEdit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(customer);
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
            
            <Dialog
                open={deleteDialogOpen}
                onClose={cancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="bg-red-50 text-red-700">
                    Confirm Customer Deletion
                </DialogTitle>
                <DialogContent className="mt-4">
                    <DialogContentText id="alert-dialog-description">
                        <div className="flex items-center mb-4">
                            <div className="bg-red-100 p-2 rounded-full mr-3">
                                <MdDelete className="text-red-600 text-xl" />
                            </div>
                            <span className="font-semibold">
                                You are about to delete a customer record
                            </span>
                        </div>
                        
                        <p className="mb-4">
                            Are you sure you want to delete customer <span className="font-bold">{customerToDelete?.customerName}</span>?
                        </p>
                        
                        <div className="bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
                            <p className="text-yellow-800">
                                Warning: This action cannot be undone. All data associated with this customer will be permanently removed from the system.
                            </p>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="p-4 flex justify-end space-x-2">
                    <Button 
                        onClick={cancelDelete} 
                        variant="outlined"
                        className="px-4 py-2"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={confirmDelete} 
                        variant="contained" 
                        color="error" 
                        className="px-4 py-2"
                        autoFocus
                    >
                        Delete Customer
                    </Button>
                </DialogActions>
            </Dialog>
            
            {selectedCustomer && (
                <EditDrawer
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    item={selectedCustomer}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default CustomerList;