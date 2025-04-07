// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from "react-router-dom";
// // import { ROUTES } from "../../config/routes";
// // import {
// //   Container,
// //   Paper,
// //   TextField,
// //   Button,
// //   Box,
// //   Typography,
// //   Autocomplete,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   Drawer,
// //   TableHead,
// //   TableRow,
// //   IconButton,
// // } from '@mui/material';
// // import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

// // const SalesOrderAdd = () => {
// //   const generateInvoiceNumber = () => {
// //     return `INV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
// //   };

// //   const getCurrentDate = () => {
// //     const today = new Date();
// //     return today.toISOString().split('T')[0];
// //   };

// //   const [invoiceData, setInvoiceData] = useState({
// //     invoiceNumber: generateInvoiceNumber(),
// //     date: getCurrentDate(),
// //     customer: null,
// //   });

// //   const [customers, setCustomers] = useState([]);
// //   const [items, setItems] = useState([]);
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const navigate = useNavigate();

// //   // Fetch customers from backend
// //   useEffect(() => {
// //     axios.get('http://localhost:8085/api/v1/customer/all')
// //       .then(response => {
// //         setCustomers(response.data);
// //       })
// //       .catch(error => {
// //         console.error("Failed to fetch customers:", error);
// //       });
// //   }, []);

// //   const handleAddItem = () => {
// //     setItems([...items, { id: Date.now(), name: '', quantity: 0, price: 0 }]);
// //     setDrawerOpen(true);
// //   };

// //   const handleCustomerChange = (event, newValue) => {
// //     setInvoiceData({ ...invoiceData, customer: newValue });
// //   };

// //   const handlePublish = () => {
// //     if (!invoiceData.customer) {
// //       alert('Please select a customer');
// //       return;
// //     }

// //     navigate(ROUTES.PROTECTED.SALES_ORDER.INVOICE, {
// //       state: {
// //         orderId: invoiceData.invoiceNumber,
// //         date: invoiceData.date,
// //         customerName: invoiceData.customer.customerName,
// //       }
// //     });
// //   };

// //   const handleDiscard = () => {
// //     navigate(ROUTES.PROTECTED.SALES_ORDER.LIST);
// //   };

// //   // Custom filter function for customer search
// //   const filterOptions = (options, { inputValue }) => {
// //     const input = inputValue.toLowerCase().trim();
// //     return options.filter((option) =>
// //       option.customerName.toLowerCase().includes(input)
// //     );
// //   };

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 4 }}>
// //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
// //         <Typography variant="h6">Invoice Info</Typography>
// //         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
// //           <Button variant="outlined" color="primary" sx={{ mr: 2 }} onClick={handleDiscard}>
// //             Discard
// //           </Button>
// //           <Button variant="contained" color="primary" onClick={handlePublish}>
// //             Create an Invoice
// //           </Button>
// //         </Box>
// //       </Box>

// //       <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
// //         <TextField
// //           fullWidth
// //           label="Invoice Number"
// //           variant="outlined"
// //           value={invoiceData.invoiceNumber}
// //           InputProps={{ readOnly: true }}
// //         />
// //         <TextField
// //           fullWidth
// //           type="date"
// //           variant="outlined"
// //           value={invoiceData.date}
// //           InputProps={{ readOnly: true }}
// //         />
// //       </Box>

// //       <Typography variant="h6" sx={{ mb: 2 }}>Customer</Typography>
// //       <Autocomplete
// //         options={customers}
// //         getOptionLabel={(option) => option.customerName || ""}
// //         value={invoiceData.customer}
// //         onChange={handleCustomerChange}
// //         filterOptions={filterOptions} // Added custom filter function
// //         renderInput={(params) => (
// //           <TextField
// //             {...params}
// //             placeholder="Search Customer by Name"
// //             variant="outlined"
// //             sx={{ mb: 6 }}
// //           />
// //         )}
// //         noOptionsText="No customers found"
// //       />

// //       <Typography variant="h6" sx={{ mb: 2 }}>Finished Good</Typography>
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         startIcon={<AddIcon />}
// //         onClick={handleAddItem}
// //         sx={{ mb: 2 }}
// //       >
// //         ADD
// //       </Button>

// //       <Drawer
// //         anchor="right"
// //         open={drawerOpen}
// //         onClose={() => setDrawerOpen(false)}
// //       >
// //         <Box sx={{ p: 3, width: "100%", maxWidth: 500, mx: "auto" }}>
// //           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// //             <Typography variant="h6">Add New Item</Typography>
// //             <IconButton onClick={() => setDrawerOpen(false)}>
// //               <CloseIcon />
// //             </IconButton>
// //           </Box>
// //           <TextField fullWidth label="Style Number" variant="outlined" sx={{ mb: 2, width: '90%' }} />
// //           <TextField fullWidth label="Name" variant="outlined" sx={{ mb: 2, width: '90%' }} />
// //           <TextField
// //             fullWidth
// //             label="Description"
// //             variant="outlined"
// //             multiline
// //             rows={4}
// //             sx={{ mb: 2, width: '90%' }}
// //           />
// //           <TextField fullWidth type="number" label="Unit Price" variant="outlined" sx={{ mb: 2, width: '90%' }} />
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             fullWidth
// //             sx={{ width: '90%' }}
// //             onClick={() => setDrawerOpen(false)}
// //           >
// //             Add Item
// //           </Button>
// //         </Box>
// //       </Drawer>

// //       {items.length > 0 && (
// //         <TableContainer component={Paper}>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>Name</TableCell>
// //                 <TableCell align="right">Quantity</TableCell>
// //                 <TableCell align="right">Price</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {items.map((item) => (
// //                 <TableRow key={item.id}>
// //                   <TableCell>{item.name}</TableCell>
// //                   <TableCell align="right">{item.quantity}</TableCell>
// //                   <TableCell align="right">{item.price}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}
// //     </Container>
// //   );
// // };

// // export default SalesOrderAdd;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../../config/routes";
// import {
//   Container,
//   Paper,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Autocomplete,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   Drawer,
//   TableHead,
//   TableRow,
//   IconButton,
// } from '@mui/material';
// import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

// const SalesOrderAdd = () => {
//   const generateInvoiceNumber = () => {
//     return `INV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: generateInvoiceNumber(),
//     date: getCurrentDate(),
//     customer: null,
//   });

//   const [customers, setCustomers] = useState([]);
//   const [items, setItems] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Fetch customers from backend
//   useEffect(() => {
//     axios.get('http://localhost:8085/api/v1/customer/all')
//       .then(response => {
//         setCustomers(response.data);
//       })
//       .catch(error => {
//         console.error("Failed to fetch customers:", error);
//       });
//   }, []);

//   const handleAddItem = () => {
//     setItems([...items, { id: Date.now(), name: '', quantity: 0, price: 0 }]);
//     setDrawerOpen(true);
//   };

//   const handleCustomerChange = (event, newValue) => {
//     setInvoiceData({ ...invoiceData, customer: newValue });
//   };

//   const handlePublish = () => {
//     if (!invoiceData.customer) {
//       alert('Please select a customer');
//       return;
//     }

//     navigate(ROUTES.PROTECTED.SALES_ORDER.INVOICE, {
//       state: {
//         orderId: invoiceData.invoiceNumber,
//         date: invoiceData.date,
//         customerName: invoiceData.customer.customerName,
//       }
//     });
//   };

//   const handleDiscard = () => {
//     navigate(ROUTES.PROTECTED.SALES_ORDER.LIST);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
//         <Typography variant="h6">Invoice Info</Typography>
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button variant="outlined" color="primary" sx={{ mr: 2 }} onClick={handleDiscard}>
//             Discard
//           </Button>
//           <Button variant="contained" color="primary" onClick={handlePublish}>
//             Create an Invoice
//           </Button>
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
//         <TextField
//           fullWidth
//           label="Invoice Number"
//           variant="outlined"
//           value={invoiceData.invoiceNumber}
//           InputProps={{ readOnly: true }}
//         />
//         <TextField
//           fullWidth
//           type="date"
//           variant="outlined"
//           value={invoiceData.date}
//           InputProps={{ readOnly: true }}
//         />
//       </Box>

//       <Typography variant="h6" sx={{ mb: 2 }}>Customer</Typography>
//       <Autocomplete
//         options={customers}
//         getOptionLabel={(option) => option.customerName || ""}
//         filterOptions={(options, { inputValue }) =>
//           options.filter(option =>
//             option.customerName?.toLowerCase().includes(inputValue.toLowerCase())
//           )
//         }
//         value={invoiceData.customer}
//         onChange={handleCustomerChange}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             placeholder="Search by Customer Name"
//             variant="outlined"
//             sx={{ mb: 6 }}
//           />
//         )}
//       />

//       <Typography variant="h6" sx={{ mb: 2 }}>Finished Good</Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<AddIcon />}
//         onClick={handleAddItem}
//         sx={{ mb: 2 }}
//       >
//         ADD
//       </Button>

//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <Box sx={{ p: 3, width: "100%", maxWidth: 500, mx: "auto" }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">Add New Item</Typography>
//             <IconButton onClick={() => setDrawerOpen(false)}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <TextField fullWidth label="Style Number" variant="outlined" sx={{ mb: 2, width: '90%' }} />
//           <TextField fullWidth label="Name" variant="outlined" sx={{ mb: 2, width: '90%' }} />
//           <TextField
//             fullWidth
//             label="Description"
//             variant="outlined"
//             multiline
//             rows={4}
//             sx={{ mb: 2, width: '90%' }}
//           />
//           <TextField fullWidth type="number" label="Unit Price" variant="outlined" sx={{ mb: 2, width: '90%' }} />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ width: '90%' }}
//             onClick={() => setDrawerOpen(false)}
//           >
//             Add Item
//           </Button>
//         </Box>
//       </Drawer>

//       {items.length > 0 && (
//         <TableContainer component={Paper}>
//           <Table>
//             {/* You can implement TableHead and TableBody here */}
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Price</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {items.map((item, index) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>{item.quantity}</TableCell>
//                   <TableCell>{item.price}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Container>
//   );
// };

// export default SalesOrderAdd;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Drawer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

const SalesOrderAdd = () => {
  const generateInvoiceNumber = () => {
    return `INV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    date: getCurrentDate(),
    customer: null,
  });

  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  //  Fetch customers from backend
  useEffect(() => {
    axios.get('http://localhost:8085/api/v1/customer/all')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch customers:", error);
      });
  }, []);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 0, price: 0 }]);
    setDrawerOpen(true);
  };

  const handleCustomerChange = (event, newValue) => {
    setInvoiceData({ ...invoiceData, customer: newValue });
  };

  const handlePublish = () => {
    if (!invoiceData.customer) {
      alert('Please select a customer');
      return;
    }

    navigate(ROUTES.PROTECTED.SALES_ORDER.INVOICE, {
      state: {
        orderId: invoiceData.invoiceNumber,
        date: invoiceData.date,
        customerName: invoiceData.customer.customerName,
      }
    });
  };

  const handleDiscard = () => {
    navigate(ROUTES.PROTECTED.SALES_ORDER.LIST);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
        <Typography variant="h6">Invoice Info</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" sx={{ mr: 2 }} onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="contained" color="primary" onClick={handlePublish}>
            Create an Invoice
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Invoice Number"
          variant="outlined"
          value={invoiceData.invoiceNumber}
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          type="date"
          variant="outlined"
          value={invoiceData.date}
          InputProps={{ readOnly: true }}
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Customer</Typography>
      <Autocomplete
        options={customers}
        getOptionLabel={(option) => option.customerName || ""}
        value={invoiceData.customer}
        onChange={handleCustomerChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select Customer"
            variant="outlined"
            sx={{ mb: 6 }}
          />
        )}
      />

      <Typography variant="h6" sx={{ mb: 2 }}>Finished Good</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddItem}
        sx={{ mb: 2 }}
      >
        ADD
      </Button>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ p: 3, width: "100%", maxWidth: 500, mx: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Add New Item</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField fullWidth label="Style Number" variant="outlined" sx={{ mb: 2, width: '90%' }} />
          <TextField fullWidth label="Name" variant="outlined" sx={{ mb: 2, width: '90%' }} />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2, width: '90%' }}
          />
          <TextField fullWidth type="number" label="Unit Price" variant="outlined" sx={{ mb: 2, width: '90%' }} />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ width: '90%' }}
            onClick={() => setDrawerOpen(false)}
          >
            Add Item
          </Button>
        </Box>
      </Drawer>

      {items.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            {/* Add your TableHead and TableBody here as needed */}
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default SalesOrderAdd;