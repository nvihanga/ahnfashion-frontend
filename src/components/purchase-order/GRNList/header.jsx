export default function Header() {
  return (
    <div className="px-6 pt-6  border-gray-200 flex justify-between items-center">
      <h1 className="text-2xl font-bold">GRN List</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={() => (window.location.href = "/purchase-order/create-grn")}
      >
        Create New GRN
      </button>
    </div>
  );
}
