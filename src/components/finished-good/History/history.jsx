// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const History = () => {
//   const [stockHistory, setStockHistory] = useState([]);
//   const [editStock, setEditStock] = useState(null);
//   const [deleteStockId, setDeleteStockId] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch stock history on mount
//   useEffect(() => {
//     setIsLoading(true);
//     axios
//       .get("http://localhost:8085/api/v1/finishedGood/stock/all")
//       .then((response) => {
//         setStockHistory(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching stock history:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   // Open delete confirmation dialog
//   const handleOpenDelete = (stockId) => {
//     setDeleteStockId(stockId);
//     setDeleteOpen(true);
//   };

//   // Delete stock record
//   const handleDelete = () => {
//     axios
//       .delete(`http://localhost:8085/api/v1/finishedGood/stock/delete/${deleteStockId}`)
//       .then(() => {
//         setStockHistory(stockHistory.filter((stock) => stock.stockID !== deleteStockId));
//         setDeleteOpen(false);
//         setDeleteStockId(null);
//       })
//       .catch((error) => {
//         console.error("Error deleting stock:", error);
//         alert("Failed to delete stock. Please try again.");
//       });
//   };

//   // Open edit dialog with selected stock
//   const handleEdit = (stock) => {
//     setEditStock({ ...stock }); // Clone the stock object
//     setEditOpen(true);
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditStock((prev) => ({ ...prev, [name]: value }));
//   };

//   // Update stock record
//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `http://localhost:8085/api/v1/finishedGood/stock/update/${editStock.stockID}`,
//         editStock
//       );
//       setStockHistory(
//         stockHistory.map((stock) =>
//           stock.stockID === editStock.stockID ? editStock : stock
//         )
//       );
//       setEditOpen(false);
//     } catch (error) {
//       console.error("Error updating stock:", error);
//       alert("Failed to update stock. Please try again.");
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Stock History</h2>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : stockHistory.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           No stock history found
//         </div>
//       ) : (
//         <div className="overflow-x-auto rounded-lg border border-gray-200">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Stock ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Product Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Size
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Quantity
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Received Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {stockHistory.map((stock) => (
//                 <tr key={stock.stockID} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {stock.stockID}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {stock.productName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {stock.productDescription}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {stock.size}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {stock.quantityReceived}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(stock.receivedDate)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => handleEdit(stock)}
//                       className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleOpenDelete(stock.stockID)}
//                       className="text-red-600 hover:text-red-900 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Edit Dialog */}
//       {editOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">Edit Stock Record</h3>
//             </div>
//             <div className="px-6 py-4">
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Size
//                 </label>
//                 <input
//                   name="size"
//                   value={editStock?.size || ""}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Quantity Received
//                 </label>
//                 <input
//                   type="number"
//                   name="quantityReceived"
//                   value={editStock?.quantityReceived || ""}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Received Date
//                 </label>
//                 <input
//                   type="date"
//                   name="receivedDate"
//                   value={editStock?.receivedDate || ""}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end rounded-b-lg">
//               <button
//                 onClick={() => setEditOpen(false)}
//                 className="bg-white text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm mr-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Dialog */}
//       {deleteOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-red-600">Delete Stock Record</h3>
//             </div>
//             <div className="px-6 py-4">
//               <div className="flex items-center mb-4">
//                 <div className="rounded-full bg-red-100 p-3 mr-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-red-600"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-gray-700">
//                   Are you sure you want to delete this stock record? This action cannot be undone.
//                 </p>
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end rounded-b-lg">
//               <button
//                 onClick={() => setDeleteOpen(false)}
//                 className="bg-white text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm mr-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const History = () => {
//   const [stockHistory, setStockHistory] = useState([]);
//   const [editStock, setEditStock] = useState(null);
//   const [deleteStockId, setDeleteStockId] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch stock history on mount
//   useEffect(() => {
//     setIsLoading(true);
//     axios
//       .get("http://localhost:8085/api/stock") // Updated endpoint
//       .then((response) => {
//         setStockHistory(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching stock history:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   // Open delete confirmation dialog
//   const handleOpenDelete = (stockId) => {
//     setDeleteStockId(stockId);
//     setDeleteOpen(true);
//   };

//   // Delete stock record
//   const handleDelete = () => {
//     axios
//       .delete(`http://localhost:8085/api/stock/${deleteStockId}`) // Updated endpoint
//       .then(() => {
//         setStockHistory(stockHistory.filter((stock) => stock.stockID !== deleteStockId));
//         setDeleteOpen(false);
//         setDeleteStockId(null);
//       })
//       .catch((error) => {
//         console.error("Error deleting stock:", error);
//         alert("Failed to delete stock. Please try again.");
//       });
//   };

//   // Open edit dialog with selected stock
//   const handleEdit = (stock) => {
//     setEditStock({ ...stock }); // Clone the stock object
//     setEditOpen(true);
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditStock((prev) => ({ ...prev, [name]: value }));
//   };

//   // Update stock record
//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `http://localhost:8085/api/stock/${editStock.stockID}`, // Updated endpoint
//         editStock
//       );
//       setStockHistory(
//         stockHistory.map((stock) =>
//           stock.stockID === editStock.stockID ? editStock : stock
//         )
//       );
//       setEditOpen(false);
//     } catch (error) {
//       console.error("Error updating stock:", error);
//       alert("Failed to update stock. Please try again.");
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Stock History</h2>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : stockHistory.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           No stock history found
//         </div>
//       ) : (
//         <div className="overflow-x-auto rounded-lg border border-gray-200">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Stock ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Product Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Size
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Quantity
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Received Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {stockHistory.map((stock) => (
//                 <tr key={stock.stockID} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {stock.stockID}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {stock.productName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {stock.productDescription}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {stock.size}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {stock.quantityReceived}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(stock.receivedDate)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => handleEdit(stock)}
//                       className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleOpenDelete(stock.stockID)}
//                       className="text-red-600 hover:text-red-900 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Edit Dialog */}
//       {editOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">Edit Stock Record</h3>
//             </div>
//             <div className="px-6 py-4">
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Size
//                 </label>
//                 <input
//                   name="size"
//                   value={editStock?.size || ""}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Quantity Received
//                 </label>
//                 <input
//                   type="number"
//                   name="quantityReceived"
//                   value={editStock?.quantityReceived || ""}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Received Date
//                 </label>
//                 <input
//                   type="date"
//                   name="receivedDate"
//                   value={editStock?.receivedDate || ""}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end rounded-b-lg">
//               <button
//                 onClick={() => setEditOpen(false)}
//                 className="bg-white text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm mr-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Dialog */}
//       {deleteOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-red-600">Delete Stock Record</h3>
//             </div>
//             <div className="px-6 py-4">
//               <div className="flex items-center mb-4">
//                 <div className="rounded-full bg-red-100 p-3 mr-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-red-600"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-gray-700">
//                   Are you sure you want to delete this stock record? This action cannot be undone.
//                 </p>
//               </div>
//             </div>
//             <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end rounded-b-lg">
//               <button
//                 onClick={() => setDeleteOpen(false)}
//                 className="bg-white text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm mr-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;






















import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [stockHistory, setStockHistory] = useState([]);
  const [editStock, setEditStock] = useState(null);
  const [deleteStockId, setDeleteStockId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch stock history on mount
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8085/api/stock")
      .then((response) => {
        console.log("API Response:", response.data); // Log to verify structure
        setStockHistory(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stock history:", error);
        setIsLoading(false);
      });
  }, []);

  // Open delete confirmation dialog
  const handleOpenDelete = (stockId) => {
    setDeleteStockId(stockId);
    setDeleteOpen(true);
  };

  // Delete stock record
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8085/api/stock/${deleteStockId}`)
      .then(() => {
        setStockHistory(stockHistory.filter((stock) => stock.stockID !== deleteStockId));
        setDeleteOpen(false);
        setDeleteStockId(null);
      })
      .catch((error) => {
        console.error("Error deleting stock:", error);
        alert("Failed to delete stock. Please try again.");
      });
  };

  // Open edit dialog with selected stock
  const handleEdit = (stock) => {
    setEditStock({ ...stock }); // Clone the stock object
    setEditOpen(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditStock((prev) => ({ ...prev, [name]: value }));
  };

  // Update stock record
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8085/api/stock/${editStock.stockID}`, editStock);
      setStockHistory(
        stockHistory.map((stock) =>
          stock.stockID === editStock.stockID ? editStock : stock
        )
      );
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock. Please try again.");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Stock History</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : stockHistory.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No stock history found
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockHistory.map((stock) => (
                <tr key={stock.stockID} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {stock.stockID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock.finishedGood?.finishName || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock.finishedGood?.finishDescription || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock.finishedGoodVariant?.size || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock.quantityReceived || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(stock.receivedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(stock)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenDelete(stock.stockID)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Dialog */}
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Edit Stock Record</h3>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product Name
                </label>
                <input
                  name="finishName"
                  value={editStock?.finishedGood?.finishName || ""}
                  onChange={(e) =>
                    setEditStock((prev) => ({
                      ...prev,
                      finishedGood: { ...prev.finishedGood, finishName: e.target.value },
                    }))
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <input
                  name="finishDescription"
                  value={editStock?.finishedGood?.finishDescription || ""}
                  onChange={(e) =>
                    setEditStock((prev) => ({
                      ...prev,
                      finishedGood: { ...prev.finishedGood, finishDescription: e.target.value },
                    }))
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Size
                </label>
                <input
                  name="size"
                  value={editStock?.finishedGoodVariant?.size || ""}
                  onChange={(e) =>
                    setEditStock((prev) => ({
                      ...prev,
                      finishedGoodVariant: { ...prev.finishedGoodVariant, size: e.target.value },
                    }))
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Quantity Received
                </label>
                <input
                  type="number"
                  name="quantityReceived"
                  value={editStock?.quantityReceived || ""}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Received Date
                </label>
                <input
                  type="date"
                  name="receivedDate"
                  value={
                    editStock?.receivedDate
                      ? new Date(editStock.receivedDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end rounded-b-lg">
              <button
                onClick={() => setEditOpen(false)}
                className="bg-white text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm mr-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-red-600">Delete Stock Record</h3>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-red-100 p-3 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Are you sure you want to delete this stock record? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end rounded-b-lg">
              <button
                onClick={() => setDeleteOpen(false)}
                className="bg-white text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm mr-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;