import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";

const RawMaterialStockAddRecheckingList = ({ stockList, setStockList }) => {
  const handleDeleteClick = (stock) => {
    const updatedStockList = stockList.filter((obj) => obj !== stock);
    setStockList(updatedStockList);
  };
  return (
    <>
      <div className="mt-5 border-gray-200 border-2">
        <TableContainer>
          <Table width={100}>
            <TableHead>
              <TableRow>
                <TableCell>Product Id</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockList.map((stock, index) => (
                <TableRow key={stockList.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{stock.productName}</TableCell>
                  <TableCell>{stock.supplier}</TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      id="delete"
                      onClick={() => handleDeleteClick(stock)}
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
    </>
  );
};

RawMaterialStockAddRecheckingList.propTypes = {
  stockList: PropTypes.array.isRequired,
  setStockList: PropTypes.func.isRequired,
};

export default RawMaterialStockAddRecheckingList;
