import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import cashOutApi from '../../api/cashOutApi';

const CashOutList = () => {
    const [cashOuts, setCashOuts] = useState([]);
    const [search, setSearch] = useState("");

    const fetchCashOuts = async () => {
        try {
          const response = await cashOutApi.getAll();
          console.log("Full API Response:", response);
          if (response.data && Array.isArray(response.data)) {
            setCashOuts(response.data);
          } else {
            console.error("Unexpected response format:", response);
            setCashOuts([]);
          }
        } catch (err) {
          console.error("Failed to fetch:", err);
          if (err.response) {
            console.error("Response status:", err.response.status);
            console.error("Response data:", err.response.data);
          }
          setCashOuts([]);
        }
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
                                <TableCell>Rs. {co.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CashOutList;