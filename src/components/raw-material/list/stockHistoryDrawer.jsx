import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";

export default function StockHistoryDrawer({ open, onClose, historyData }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 800, padding: 2 }} role="presentation">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h2 className="capitalize text-lg font-bold ">STOCK HISTORY</h2>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>

        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyData?.map((history) => (
                <tr key={history.historyId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(history.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {history.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {history.supplierName || "-"}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      history.action === "ADD"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {history.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {history.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </Drawer>
  );
}

StockHistoryDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  historyData: PropTypes.array.isRequired,
};
