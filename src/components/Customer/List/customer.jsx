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
    const [customers, setCustomers] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [search, setSearch] = useState("");
    const [viewDetails, setViewDetails] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios
            .get("http://localhost:8085/api/v1/customer/all") // Updated endpoint
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching customers:", error);
            });
    };

    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
        setDrawerOpen(true);
    };

    const handleDeleteClick = (customerId) => {
        axios
            .delete(`http://localhost:8085/api/v1/customer/delete/${customerId}`) // Updated endpoint
            .then(() => {
                setCustomers(customers.filter((customer) => customer.customerId !== customerId)); // Updated filter check
            })
            .catch((error) => {
                console.error("Error deleting customer:", error);
            });
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedCustomer(null);
    };

    const handleSave = (updatedCustomer) => {
        axios
            .put(`http://localhost:8085/api/v1/customer/update/${updatedCustomer.customerId}`, updatedCustomer) // Updated endpoint
            .then(() => {
                fetchCustomers(); // Refresh list after update
                setDrawerOpen(false);
            })
            .catch((error) => {
                console.error("Error updating customer:", error);
            });
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
                    <div className="w-full border-collapse p-4 flex flex-col">
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
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Customer Code</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCustomers.map((customer, index) => (
                                    <TableRow
                                        key={customer.customerId}
                                        onClick={() => handleRowClick(customer)}
                                        style={{ cursor: "pointer" }}
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