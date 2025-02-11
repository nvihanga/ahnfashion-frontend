import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  
  const FinishedGoodStockAddRecheckingList = () => {
    return (
      <>
        <div className="mt-5 border-gray-200 border-2">
          <TableContainer>
            <Table width={100}>
              <TableHead>
                <TableRow>
                  <TableCell>Style Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  };
  
  export default FinishedGoodStockAddRecheckingList;
  