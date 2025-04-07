"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Trash2,
  Send,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Edit,
} from "lucide-react";

import PurchaseOrderEdit from "./purchaseOrderEdit";
import InvoiceDetailsModal from "./purchaseOrderDetails";
import {
  getPurchaseOrders,
  sendPurchaseOrderEmail,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from "../../api/purchase-order/api";
import Toast from "../../common/Toast";

export default function PurchaseOrderTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [sendEmail, setSendEmail] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await getPurchaseOrders();

        setToast({
          open: true,
          severity: "success",
          message: "Purchase orders fetched successfully",
        });
        setPurchaseOrders(response.data);
        console.log(response.data);
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message: "Failed to fetch purchase orders" + error.message,
        });
      }
    };
    fetchPurchaseOrders();
  }, []);

  const filteredOrders = purchaseOrders.filter(
    (order) =>
      order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleRemove = async (id) => {
    try {
      await deletePurchaseOrder(id);
      setPurchaseOrders(purchaseOrders.filter((order) => order.id !== id));
      setToast({
        open: true,
        severity: "success",
        message: "Purchase order deleted successfully",
      });
      const response = await getPurchaseOrders();
      setPurchaseOrders(response.data);
      setConfirmDelete(null);
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: "Failed to delete purchase order: " + error.message,
      });
    }
  };

  const handleSendInvoice = async (order) => {
    try {
      await sendPurchaseOrderEmail(order.invoiceNumber);
      setPurchaseOrders(
        purchaseOrders.map((po) =>
          po.id === order.id ? { ...po, status: "sent", sendCreated: true } : po
        )
      );
      setToast({
        open: true,
        severity: "success",
        message: "Purchase order email sent successfully",
      });
      setSendEmail(null);
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: "Failed to send purchase order email: " + error.message,
      });
    }
  };

  const handleInvoiceClick = (order) => {
    setSelectedInvoiceId(order.purchaseOrderId);
    setIsModalOpen(true);
  };

  const handleEditClick = (order) => {
    setEditInvoice(order.purchaseOrderId);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedInvoice) => {
    try {
      await updatePurchaseOrder(updatedInvoice);
      const response = await getPurchaseOrders();
      setPurchaseOrders(response.data);
      setToast({
        open: true,
        severity: "success",
        message: "Purchase order updated successfully",
      });
      setIsEditModalOpen(false);
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: "Failed to update purchase order: " + error.message,
      });
    }
  };

  return (
    <div className="w-full  mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Create New Order
        </button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search by Invoice ID or Supplier"
            className="w-full pl-8 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="p-2 border rounded-md hover:bg-gray-100">
          <Filter className="h-4 w-4" />
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOrders.map((order) => (
              <tr key={order.purchaseOrderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleInvoiceClick(order)}
                  >
                    {order.invoiceNumber}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.supplierName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(order.purchaseOrderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      !order.sendCreated
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {!order.sendCreated ? "Pending" : "Sent"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Rs.{order.purchaseOrderTotal.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end space-x-2">
                    {order.sendCreated === false && (
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditClick(order)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setConfirmDelete(order.purchaseOrderId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      className={`${
                        order.sendCreated === true
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-500 hover:text-blue-700"
                      }`}
                      onClick={() =>
                        order.status !== "sent" && setSendEmail(order)
                      }
                      disabled={order.sendCreated === true}
                    >
                      <Send className="h-4 w-4" />
                    </button>
                    <div className="relative">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          // In a real app, you would implement a dropdown menu here
                          alert("More options would appear here");
                        }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog for Delete */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-2">Confirm Deletion</h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to remove this invoice? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => handleRemove(confirmDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Send Email */}
      {sendEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-2">Send Invoice</h3>
            <p className="text-gray-500 mb-4">
              Send invoice {sendEmail.invoiceNo} to {sendEmail.supplier} via
              email?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                onClick={() => setSendEmail(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => handleSendInvoice(sendEmail)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + rowsPerPage, filteredOrders.length)} of{" "}
          {filteredOrders.length} results
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              className="appearance-none bg-white border rounded-md pl-3 pr-8 py-2 text-sm hover:border-gray-400 focus:outline-none focus:border-blue-500"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
          </div>
          <div className="flex items-center border rounded-md divide-x">
            <button
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="px-4 py-2 text-sm">{currentPage}</div>
            <button
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* View Invoice Modal */}
      <InvoiceDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedInvoiceId(null);
        }}
        invoice={selectedInvoiceId} // Changed from purchaseOrderId to invoice
      />

      {/* Edit Invoice Modal */}
      <PurchaseOrderEdit
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        invoice={editInvoice}
        onSave={handleSaveEdit}
      />
      <Toast
        open={toast.open}
        handleClose={handleCloseToast}
        severity={toast.severity}
        message={toast.message}
      />
    </div>
  );
}
