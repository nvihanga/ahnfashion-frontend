import { Eye, Pencil, Trash } from 'lucide-react';

const UserTable = ({ 
  displayedUsers, 
  selectedUsers, 
  handleSelectAll, 
  handleSelectUser, 
  handleEdit,
  handleView,
  handleDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-12 py-3 px-4">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                onChange={handleSelectAll}
                checked={selectedUsers.length === displayedUsers.length && displayedUsers.length > 0}
              />
            </th>
            <th className="text-left py-3 px-4">USERID</th>
            <th className="text-left py-3 px-4">USERNAME</th>
            <th className="text-left py-3 px-4">NAME</th>
            <th className="text-left py-3 px-4">EMAIL</th>
            <th className="text-left py-3 px-4">CONTACTNO</th>
            <th className="text-left py-3 px-4">ROLE</th>
            <th className="text-left py-3 px-4">ACTION</th>
          </tr>
        </thead>

        <tbody>
          {displayedUsers.map(user => (
            <tr key={user.id} className="border-t">
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </td>
              <td className="py-3 px-4">{user.id}</td>
              <td className="py-3 px-4">{user.username}</td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.phone}</td>
              <td className="py-3 px-4 capitalize">{user.role}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleView(user)}
                    className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleEdit(user)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  {user.username !== 'admin' &&
                  <button 
                    onClick={() => handleDelete(user)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash className="h-4 w-4" />
                  </button>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;