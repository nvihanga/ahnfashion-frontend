import { useState } from "react";
import Header from "./header";
import SearchBar from "./searchBar";
import GRNTable from "./GRNTable";
import Pagination from "./pagination";
import PaymentModal from "./paymentModel";
import DeleteConfirmationModal from "./deleteDialog";
import GRNDetails from "./grnDetails";

// Mock data for GRN list with detailed items and payment status
const mockGRNs = [
  {
    id: "1",
    grnNumber: "GRN-2024-001",
    date: new Date(2024, 0, 15),
    totalAmount: 1500.0,
    paidAmount: 0,
    paymentMethod: "",
    supplier: "Office Supplies Co.",
    poNumber: "PO-2024-001",
    items: [
      {
        id: "item1",
        name: "Printer Paper A4",
        quantity: 50,
        unitPrice: 10.0,
        totalPrice: 500.0,
      },
      {
        id: "item2",
        name: "Ink Cartridges",
        quantity: 10,
        unitPrice: 45.0,
        totalPrice: 450.0,
      },
      {
        id: "item3",
        name: "Staplers",
        quantity: 20,
        unitPrice: 12.5,
        totalPrice: 250.0,
      },
      {
        id: "item4",
        name: "Notebooks",
        quantity: 100,
        unitPrice: 3.0,
        totalPrice: 300.0,
      },
    ],
  },
  {
    id: "2",
    grnNumber: "GRN-2024-002",
    date: new Date(2024, 0, 18),
    totalAmount: 2750.5,
    paidAmount: 2750.5,
    paymentMethod: "Credit",
    supplier: "Tech Solutions Inc.",
    poNumber: "PO-2024-002",
    items: [
      {
        id: "item5",
        name: 'Monitors 24"',
        quantity: 5,
        unitPrice: 250.0,
        totalPrice: 1250.0,
      },
      {
        id: "item6",
        name: "Keyboards",
        quantity: 10,
        unitPrice: 45.5,
        totalPrice: 455.0,
      },
      {
        id: "item7",
        name: "Wireless Mouse",
        quantity: 15,
        unitPrice: 25.0,
        totalPrice: 375.0,
      },
      {
        id: "item8",
        name: "USB Hubs",
        quantity: 8,
        unitPrice: 35.0,
        totalPrice: 280.0,
      },
      {
        id: "item9",
        name: "HDMI Cables",
        quantity: 20,
        unitPrice: 19.5,
        totalPrice: 390.5,
      },
    ],
  },
  {
    id: "3",
    grnNumber: "GRN-2024-003",
    date: new Date(2024, 0, 20),
    totalAmount: 890.75,
    paidAmount: 890.75,
    paymentMethod: "Cash",
    supplier: "Furniture Depot",
    poNumber: "PO-2024-003",
    items: [
      {
        id: "item10",
        name: "Office Chairs",
        quantity: 3,
        unitPrice: 120.25,
        totalPrice: 360.75,
      },
      {
        id: "item11",
        name: "Desk Lamps",
        quantity: 5,
        unitPrice: 45.0,
        totalPrice: 225.0,
      },
      {
        id: "item12",
        name: "Filing Cabinets",
        quantity: 2,
        unitPrice: 152.5,
        totalPrice: 305.0,
      },
    ],
  },
  {
    id: "4",
    grnNumber: "GRN-2024-004",
    date: new Date(2024, 0, 22),
    totalAmount: 3200.0,
    paidAmount: 1200.0,
    paymentMethod: "Credit",
    supplier: "Electronics Wholesale",
    poNumber: "PO-2024-004",
    items: [
      {
        id: "item13",
        name: "Laptops",
        quantity: 2,
        unitPrice: 1200.0,
        totalPrice: 2400.0,
      },
      {
        id: "item14",
        name: "Tablet Devices",
        quantity: 4,
        unitPrice: 200.0,
        totalPrice: 800.0,
      },
    ],
  },
];

export default function MainGRNList() {
  const [grns, setGRNs] = useState(mockGRNs);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGRN, setSelectedGRN] = useState(null);
  const [grnToDelete, setGrnToDelete] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  // Filter GRNs based on search term
  const filteredGRNs = grns.filter(
    (grn) =>
      grn.grnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grn.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open delete confirmation modal
  const handleDeleteClick = (grn) => {
    setGrnToDelete(grn);
    setShowDeleteModal(true);
  };

  // Confirm delete GRN
  const confirmDelete = () => {
    if (grnToDelete) {
      setGRNs(grns.filter((grn) => grn.id !== grnToDelete.id));
      setShowDeleteModal(false);
      setGrnToDelete(null);
    }
  };

  // Open payment modal
  const handlePaymentClick = (grn) => {
    setSelectedGRN(grn);
    setPaymentAmount(grn.totalAmount - grn.paidAmount);
    setShowPaymentModal(true);
  };

  // Open details modal
  const handleGRNClick = (grn) => {
    setSelectedGRN(grn);
    setShowDetailsModal(true);
  };

  // Update payment method
  const handlePaymentMethodSelect = (method) => {
    const amount = Number(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;

    setGRNs(
      grns.map((grn) => {
        if (grn.id === selectedGRN.id) {
          const newPaidAmount = grn.paidAmount + amount;
          return {
            ...grn,
            paidAmount: newPaidAmount,
            paymentMethod: method,
          };
        }
        return grn;
      })
    );
    setShowPaymentModal(false);
    setSelectedGRN(null);
    setPaymentAmount("");
  };

  // Calculate remaining amount
  const getRemainingAmount = (grn) => {
    return grn.totalAmount - grn.paidAmount;
  };

  // Get payment status display
  const getPaymentStatus = (grn) => {
    if (grn.paidAmount >= grn.totalAmount) {
      return (
        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Paid
        </span>
      );
    }
    if (grn.paidAmount > 0) {
      return `Rs. ${getRemainingAmount(grn).toFixed(2)}`;
    }
    return `Rs. ${grn.totalAmount.toFixed(2)}`;
  };

  // Get payment action button
  const getPaymentAction = (grn) => {
    if (grn.paidAmount >= grn.totalAmount) {
      return null;
    }
    if (grn.paidAmount > 0 && grn.paymentMethod === "Credit") {
      return (
        <button
          onClick={() => handlePaymentClick(grn)}
          className="text-orange-500 hover:text-orange-700 font-medium"
        >
          Pay Credit
        </button>
      );
    }
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
        selectedGRN={selectedGRN}
        closeModal={closeDetailsModal}
        handlePaymentClick={handlePaymentClick}
      />
    </div>
  );
}
