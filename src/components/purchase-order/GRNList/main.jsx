import { useState, useEffect } from "react";
import {
  getAllGRN,
  getGrnByPurchaseOrderINvoiceNo,
  deletePurchaseOrderGrn,
  addPayement,
  payCredit,
} from "../../api/grn-create/api";
import Header from "./header";
import SearchBar from "./searchBar";
import GRNTable from "./GRNTable";
import Pagination from "./pagination";
import PaymentModal from "./paymentModel";
import DeleteConfirmationModal from "./deleteDialog";
import GRNDetails from "./grnDetails";
import Toast from "../../common/Toast";

export default function MainGRNList() {
  const [grns, setGRNs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGRN, setSelectedGRN] = useState(null);
  const [grnToDelete, setGrnToDelete] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grnDetails, setGRNDetails] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    fetchGRNs();
  }, []);

  const fetchGRNs = async () => {
    try {
      const response = await getAllGRN();
      if (response.data) {
        setGRNs(response.data);
      }
    } catch (err) {
      setError("Failed to fetch GRNs");
      console.error("Error fetching GRNs:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGRNs = grns.filter(
    (grn) =>
      grn.grnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grn.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (grn) => {
    setGrnToDelete(grn);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (grnToDelete) {
      try {
        await deletePurchaseOrderGrn(grnToDelete.id);
        setGRNs(grns.filter((grn) => grn.purchaseOrderId !== grnToDelete.id));
        setToast({
          open: true,
          severity: "success",
          message: "GRN deleted successfully",
        });
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message: "Failed to delete GRN: " + error.message,
        });
      } finally {
        setShowDeleteModal(false);
        setGrnToDelete(null);
      }
    }
  };

  // Open payment modal
  const handlePaymentClick = (grn) => {
    setSelectedGRN(grn);
    setPaymentAmount(grn.totalAmount - grn.paidAmount);
    setShowPaymentModal(true);
  };

  // Open details modal
  const handleGRNClick = async (grn) => {
    try {
      const response = await getGrnByPurchaseOrderINvoiceNo(grn.invoiceNumber);
      if (response.data) {
        setGRNDetails(response.data);
        setShowDetailsModal(true);
      }
    } catch (err) {
      console.error("Error fetching GRN details:", err);
    }
  };

  // Update payment method
  const handlePaymentMethodSelect = async (paymentDetails) => {
    try {
      if (paymentDetails.isPayingCredit) {
        await payCredit(paymentDetails);
      } else {
        await addPayement(paymentDetails);
      }

      await fetchGRNs();

      setToast({
        open: true,
        severity: "success",
        message: paymentDetails.isPayingCredit
          ? "Credit payment processed successfully"
          : "Payment added successfully",
      });
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: "Failed to process payment: " + error.message,
      });
    } finally {
      setShowPaymentModal(false);
      setSelectedGRN(null);
      setPaymentAmount("");
    }
  };

  // Calculate remaining amount
  const getRemainingAmount = (grn) => {
    return grn.totalAmount - grn.paidAmount;
  };

  // Get payment status display
  const getPaymentStatus = (grn) => {
    if (!grn.toPay) {
      return (
        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Pending
        </span>
      );
    }
    return `Rs. ${grn.toPay}`;
  };

  // Get payment action button
  const getPaymentAction = (grn) => {
    if (grn.paymentType === "CREDIT" && parseFloat(grn.toPay) > 0) {
      return (
        <button
          onClick={() => handlePaymentClick(grn)}
          className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center"
        >
          Pay Credit
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      );
    }

    if (!grn.sendCreated && !grn.paymentType) {
      return (
        <button
          onClick={() => handlePaymentClick(grn)}
          className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center"
        >
          Pay
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      );
    }
    return null;
  };

  // Close payment modal
  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedGRN(null);
    setPaymentAmount("");
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setGrnToDelete(null);
  };

  // Close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedGRN(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md">
        <Header />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <GRNTable
          filteredGRNs={filteredGRNs}
          handleGRNClick={handleGRNClick}
          handlePaymentClick={handlePaymentClick}
          handleDeleteClick={handleDeleteClick}
          getPaymentStatus={getPaymentStatus}
          getPaymentAction={getPaymentAction}
        />
        <Pagination filteredGRNs={filteredGRNs} />
      </div>
      <PaymentModal
        showPaymentModal={showPaymentModal}
        selectedGRN={selectedGRN}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        handlePaymentMethodSelect={handlePaymentMethodSelect}
        closeModal={closePaymentModal}
        getRemainingAmount={getRemainingAmount}
      />

      <DeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        grnToDelete={grnToDelete}
        confirmDelete={confirmDelete}
        closeModal={closeDeleteModal}
      />

      <GRNDetails
        showDetailsModal={showDetailsModal}
        selectedGRN={grnDetails}
        closeModal={closeDetailsModal}
        handlePaymentClick={handlePaymentClick}
      />

      <Toast
        open={toast.open}
        handleClose={() => setToast({ ...toast, open: false })}
        severity={toast.severity}
        message={toast.message}
      />
    </div>
  );
}
