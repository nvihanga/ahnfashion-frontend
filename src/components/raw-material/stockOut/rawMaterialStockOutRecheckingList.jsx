import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import DialogBox from "../list/dialogBox";
import { useState } from "react";

const RawMaterialStockAddRecheckingList = ({ stockList, setStockList }) => {
  const handleDeleteClick = (stock) => {
    const updatedStockList = stockList.filter((obj) => obj !== stock);
    setStockList(updatedStockList);
    setDialogBoxOpen(false);
  };

  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(null);

  const handleDialogBoxOpen = (stock) => {
    setDialogBoxOpen(true);
    setSelectItem(stock);
  };

  return (
    <>
      <div className="mt-5 border-gray-200 border-2">
        <TableContainer component={Paper} elevation={3}>
          <Table width={100}>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>PRODUCT ID</strong>
                </TableCell>
                <TableCell>
                  <strong>PRODUCT NAME</strong>
                </TableCell>
                <TableCell>
                  <strong>DATE</strong>
                </TableCell>
                <TableCell>
                  <strong>QUANTITY</strong>
                </TableCell>
                <TableCell>
                  <strong>ACTION</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockList.map((stock, index) => (
                <TableRow key={stockList.id} style={{ cursor: "pointer" }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{stock.productName}</TableCell>
                  <TableCell>
                    {new Date(stock.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      id="delete"
                      onClick={() => handleDialogBoxOpen(stock)}
                    >
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <DialogBox
        openProp={dialogBoxOpen}
        onCloseProp={() => setDialogBoxOpen(false)}
        selectedItemProp={selectItem}
        handleDeleteProp={() => handleDeleteClick(selectItem)}
      />
    </>
  );
};

RawMaterialStockAddRecheckingList.propTypes = {
  stockList: PropTypes.array.isRequired,
  setStockList: PropTypes.func.isRequired,
};

export default RawMaterialStockAddRecheckingList;
