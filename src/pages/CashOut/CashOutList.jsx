import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Paper
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const CashOutList = () => {
    const [cashOuts, setCashOuts] = useState([]);
    const [search, setSearch] = useState("");

    const fetchCashOuts = () => {
        axios.get("http://localhost:8085/api/v1/cashout")
            .then(res => setCashOuts(res.data))
            .catch(err => console.error("Failed to fetch:", err));
    };

    useEffect(() => {
        fetchCashOuts();
    }, []);

    const filteredCashOuts = cashOuts.filter(co =>
        co.reason.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full p-4">
            <TextField
                label="Search by Reason"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                margin="normal"
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell><b>DATE</b></TableCell>
                            <TableCell><b>REASON</b></TableCell>
                            <TableCell><b>AMOUNT (LKR)</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCashOuts.map((co) => (
                            <TableRow key={co.id}>
                                <TableCell>{format(new Date(co.date), 'yyyy-MM-dd')}</TableCell>
                                <TableCell>{co.reason}</TableCell>
                                <TableCell>රු {co.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CashOutList;
