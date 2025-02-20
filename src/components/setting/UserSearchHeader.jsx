import { Search, Plus } from 'lucide-react';

const UserSearchHeader = ({ searchQuery, handleSearch, selectedUsers, onAdd }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search user"
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
          disabled={selectedUsers.length === 0}
        >
          Delete Selected
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={onAdd}>
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserSearchHeader;
