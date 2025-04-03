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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const SIZE_MAPPING = {
  L: "L",
  XL: "XL",
  XXL: "2XL",
  XXXL: "3XL",
  XXXXL: "4XL",
  XXXXXL: "5XL",
};

const FinishedGoodStockAddRecheckingList = ({ stockList = [], onRemove, onEdit }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  if (stockList.length === 0) return null;

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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockList.map((item, index) => (
            <React.Fragment key={index}>
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row expansion on button click
                      onEdit(index);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row expansion on button click
                      onRemove(index);
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>

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
                          {Object.entries(item.sizes || {}).map(([displaySize, quantity]) => (
                            <TableRow key={displaySize}>
                              <TableCell>{displaySize}</TableCell>
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