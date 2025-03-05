import PropTypes from "prop-types";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by GRN Number or Supplier"
          className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
