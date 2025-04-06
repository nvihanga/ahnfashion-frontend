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
import EditDrawerCustomer from "./editDrawer.jsx";
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
        axios.get("http://localhost:8085/api/v1/customer/all")
            .then(res => setCustomers(res.data))
            .catch(err => console.error("Error fetching customers:", err));
    };

    const handleDeleteClick = (customerId) => {
        axios.delete(`http://localhost:8085/api/v1/customer/delete/${customerId}`)
            .then(() => setCustomers(customers.filter(c => c.customerId !== customerId)))
            .catch(err => console.error("Error deleting customer:", err));
    };

    const handleSave = (updatedCustomer) => {
        axios.put(`http://localhost:8085/api/v1/customer/update/${updatedCustomer.customerId}`, updatedCustomer)
            .then(() => {
                fetchCustomers();
                setDrawerOpen(false);
            })
            .catch(err => console.error("Error updating customer:", err));
        setSelectedCustomer(null);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (customer) => {
        setSelectedCustomer(customer);
        setViewDetails(true);
    };

    const handleBackClick = () => {
        setViewDetails(false);
        setSelectedCustomer(null);
    };

    const filteredCustomers = customers.filter(c =>
        c.customerName.toLowerCase().includes(search.toLowerCase()) ||
        c.customerCode.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {viewDetails && selectedCustomer ? (
                <div className="p-4">
                    <Button variant="contained" onClick={handleBackClick}>
                        Back
                    </Button>
                    <Typography variant="h5" className="mt-4">Customer Details</Typography>
                    <TableContainer component={Paper} className="mt-4">
                        <Table>
                            <TableBody>
                                <TableRow><TableCell><b>Customer Code</b></TableCell><TableCell>{selectedCustomer.customerCode}</TableCell></TableRow>
                                <TableRow><TableCell><b>Name</b></TableCell><TableCell>{selectedCustomer.customerName}</TableCell></TableRow>
                                <TableRow><TableCell><b>Email</b></TableCell><TableCell>{selectedCustomer.email}</TableCell></TableRow>
                                <TableRow><TableCell><b>Phone Numbers</b></TableCell><TableCell>{selectedCustomer.phoneNumbers.join(", ")}</TableCell></TableRow>
                                <TableRow><TableCell><b>Address</b></TableCell><TableCell>{selectedCustomer.address}</TableCell></TableRow>
                                <TableRow><TableCell><b>Notes</b></TableCell><TableCell>{selectedCustomer.notes}</TableCell></TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <>
                    <div className="flex flex-col w-full p-4">
                        <TextField
                            label="Search by Name or Code"
                            value={search}
                            onChange={handleSearch}
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell><b>NO</b></TableCell>
                                    <TableCell><b>CODE</b></TableCell>
                                    <TableCell><b>NAME</b></TableCell>
                                    <TableCell><b>EMAIL</b></TableCell>
                                    <TableCell><b>PHONE</b></TableCell>
                                    <TableCell align="center"><b>ACTIONS</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCustomers.map((customer, index) => (
                                    <TableRow
                                        key={customer.customerId}
                                        hover
                                        onClick={() => handleRowClick(customer)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{customer.customerCode}</TableCell>
                                        <TableCell>{customer.customerName}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phoneNumbers.join(", ")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="info"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCustomer(customer);
                                                    setDrawerOpen(true);
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
                <EditDrawerCustomer
                    open={drawerOpen}
                    onClose={() => {
                        setDrawerOpen(false);
                        setSelectedCustomer(null);
                    }}
                    item={selectedCustomer}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default CustomerList;
