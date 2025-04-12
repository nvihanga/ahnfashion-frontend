import React, { useState, useEffect } from "react";
import stockApi from '../../../api/finishedGoodStockApi'; // Import the stockApi

const History = () => {
  const [stockHistory, setStockHistory] = useState([]);
  const [editStock, setEditStock] = useState(null);
  const [deleteStockId, setDeleteStockId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockHistory = async () => {
      try {
        const response = await stockApi.getAll();  // Use stockApi to get all stocks
        setStockHistory(response.data);
      } catch (error) {
        console.error("Error fetching stock history:", error);
        alert("Failed to load stock history");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStockHistory();
  }, []);

  const handleOpenDelete = (stockId) => {
    setDeleteStockId(stockId);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      const deletedStock = stockHistory.find(stock => stock.stockID === deleteStockId);
      
      // Delete stock record using stockApi
      await stockApi.delete(deleteStockId);
      
      // Adjust variant stock
      await axios.patch(
        `http://localhost:8085/api/v1/finishedGood/variant/adjust/${deletedStock.finishedGoodVariantID}`,
        { adjustment: -deletedStock.quantityReceived }
      );

      // Update local state
      setStockHistory(prev => prev.filter(stock => stock.stockID !== deleteStockId));
    } catch (error) {
      console.error("Error deleting stock:", error);
      alert("Failed to delete stock. Please try again.");
    } finally {
      setDeleteOpen(false);
      setDeleteStockId(null);
    }
  };

  const handleEdit = (stock) => {
    setEditStock({ ...stock });
    setEditOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditStock(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const originalStock = stockHistory.find(stock => stock.stockID === editStock.stockID);
      const quantityDelta = editStock.quantityReceived - originalStock.quantityReceived;

      // Update stock record using stockApi
      await stockApi.update(editStock.stockID, editStock);

      // Adjust variant stock if quantity changed
      if (quantityDelta !== 0) {
        await axios.patch(
          `http://localhost:8085/api/v1/finishedGood/variant/adjust/${editStock.finishedGoodVariantID}`,
          { adjustment: quantityDelta }
        );
      }

      // Update local state
      setStockHistory(prev => prev.map(stock => 
        stock.stockID === editStock.stockID ? editStock : stock
      ));
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock. Please try again.");
    } finally {
      setEditOpen(false);
    }
  };

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
            {/* Table headers and body remain unchanged */}
          </table>
        </div>
      )}

      {/* Edit and Delete modals remain unchanged */}
    </div>
  );
};

export default History;
