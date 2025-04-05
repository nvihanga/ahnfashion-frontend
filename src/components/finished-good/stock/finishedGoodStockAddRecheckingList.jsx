import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Box,
  IconButton,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const FinishedGoodStockAddRecheckingList = ({ stockList = [] }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  if (stockList.length === 0) return null; // Hide the table when no data is available

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockList.map((item, index) => (
            <React.Fragment key={index}>
              {/* Main Row */}
              <TableRow onClick={() => handleRowClick(index)} style={{ cursor: "pointer" }}>
                <TableCell>
                  <IconButton size="small">
                    {expandedRow === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary">Remove</Button>
                </TableCell>
              </TableRow>

              {/* Expandable Row for Size Variants */}
              <TableRow>
                <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Size Variants:
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Size</TableCell>
                            <TableCell>Quantity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(item.sizes || {}).map(([size, quantity]) => (
                            <TableRow key={size}>
                              <TableCell>{size}</TableCell>
                              <TableCell>{quantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FinishedGoodStockAddRecheckingList;
