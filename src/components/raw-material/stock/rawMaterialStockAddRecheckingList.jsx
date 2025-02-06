import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const RawMaterialStockAddRecheckingList = () => {
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
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default RawMaterialStockAddRecheckingList;
