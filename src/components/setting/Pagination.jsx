import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage,
  rowsPerPage,
  filteredUsers,
  handlePrevPage,
  handleNextPage,
  setRowsPerPage,
  setCurrentPage,
  calculatePaginationDisplay
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-t">
      <div className="flex items-center gap-2">
        Rows per page:
        <select
          className="border rounded p-1"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {calculatePaginationDisplay()}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={handleNextPage} 
            disabled={(currentPage * rowsPerPage) >= filteredUsers.length}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;