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
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import EditDrawer from "./editDrawer";
import { useState, useEffect } from "react";
import axios from "axios";

const CustomerList = () => {
    // Sample data for demonstration
    const sampleCustomers = [
        {
            customerId: 1,
            customerCode: "CUST001",
            customerName: "Ambiga Textiles",
            customerEmail: "ambiga@example.com",
            customerPhoneNo: ["555-123-4567", "555-987-6543"],
            customerAddress: "123 Main St, Colombo",
            customerNote: "Prefers email communication. Regular customer since 2020."
        },
        {
            customerId: 2,
            customerCode: "CUST002",
            customerName: "Chathura Enterprises",
            customerEmail: "chathura@example.com",
            customerPhoneNo: ["555-234-5678"],
            customerAddress: "456 Main st, Colombo",
            customerNote: "Corporate account. Net 30 payment terms."
        },
        {
            customerId: 3,
            customerCode: "CUST003",
            customerName: "Sanko Textiles",
            customerEmail: "sanko@example.com",
            customerPhoneNo: ["555-345-6789", "555-222-3333"],
            customerAddress: "789 Main st, Maharagama",
            customerNote: "Tech industry client. Interested in bulk orders."
        },
        {
            customerId: 4,
            customerCode: "CUST004",
            customerName: "Sarah Williams",
            customerEmail: "sarah.w@example.com",
            customerPhoneNo: ["555-456-7890"],
            customerAddress: "101 Main st, Maharagama",
            customerNote: "Seasonal buyer. Usually orders in Q4."
        },
        {
            customerId: 5,
            customerCode: "CUST005",
            customerName: "Robert Enterprises",
            customerEmail: "robert.g@example.com",
            customerPhoneNo: ["555-567-8901"],
            customerAddress: "234 Maple Lane, Maharagama",
            customerNote: "VIP customer. Special pricing applies."
        },
        {
            customerId: 6,
            customerCode: "CUST006",
            customerName: "Lisa Taylor",
            customerEmail: "lisa.t@example.com",
            customerPhoneNo: ["555-678-9012", "555-444-5555"],
            customerAddress: "567 Main Rd, Maharagama",
            customerNote: "Prefers phone contact. Do not email marketing materials."
        },
        {
            customerId: 7,
            customerCode: "CUST007",
            customerName: "Brown",
            customerEmail: "david.b@example.com",
            customerPhoneNo: ["555-789-0123"],
            customerAddress: "890 Main st, Colombo",
            customerNote: "New customer as of January 2025."
        }
    ];

    const [customers, setCustomers] = useState(sampleCustomers);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [search, setSearch] = useState("");
    const [viewDetails, setViewDetails] = useState(false);

    // Keep the useEffect but modify it to only attempt API fetch if in production
    useEffect(() => {
        // In a real environment, you would fetch from API
        // For demo, we'll use the sample data
        if (process.env.NODE_ENV === 'production') {
            fetchCustomers();
        }
    }, []);

    const fetchCustomers = () => {
        axios
            .get("http://localhost:8085/api/v1/customer/all")
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
                // Fallback to sample data if API fails
                setCustomers(sampleCustomers);
            });
    };

    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
        setDrawerOpen(true);
    };

    const handleDeleteClick = (customerId) => {
        // For demo, just update the local state
        setCustomers(customers.filter((customer) => customer.customerId !== customerId));
        
        // In production, would call API
        if (process.env.NODE_ENV === 'production') {
            axios
                .delete(`http://localhost:8085/api/v1/customer/delete/${customerId}`)
                .catch((error) => {
                    console.error("Error deleting customer:", error);
                    // Restore the deleted customer if API call fails
                    fetchCustomers();
                });
        }
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedCustomer(null);
    };

    const handleSave = (updatedCustomer) => {
        // For demo, just update the local state
        setCustomers(customers.map(customer => 
            customer.customerId === updatedCustomer.customerId ? updatedCustomer : customer
        ));
        setDrawerOpen(false);
        
        // In production, would call API
        if (process.env.NODE_ENV === 'production') {
            axios
                .put(`http://localhost:8085/api/v1/customer/update/${updatedCustomer.customerId}`, updatedCustomer)
                .then(() => {
                    fetchCustomers(); // Refresh list after update
                })
                .catch((error) => {
                    console.error("Error updating customer:", error);
                });
        }
        setSelectedCustomer(null);
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
        customer.customerName.toLowerCase().includes(search.toLowerCase()) ||
        customer.customerCode.toLowerCase().includes(search.toLowerCase())
    );

    // Table header style for gray background
    const headerStyle = {
        backgroundColor: '#f5f5f5',  // Light gray background
        fontWeight: 'bold'
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
                                    <TableCell><b>Customer Code</b></TableCell>
                                    <TableCell>{selectedCustomer.customerCode}</TableCell>
                                </TableRow>
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
                            label="Search by Name or Customer Code"
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
                                    <TableCell style={headerStyle}><b>CUSTOMER CODE</b></TableCell>
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
                                        <TableCell>{customer.customerCode}</TableCell>
                                        <TableCell>{customer.customerName}</TableCell>
                                        <TableCell>{customer.customerEmail}</TableCell>
                                        <TableCell>{customer.customerPhoneNo.join(", ")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="info"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCustomer(customer);
                                                    handleEditClick(customer);
                                                }}
                                            >
                                                <MdEdit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(customer.customerId);
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