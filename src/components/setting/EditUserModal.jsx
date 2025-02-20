import { useState, useEffect } from 'react';
import { Drawer, Box, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

const EditUserModal = ({ isOpen, onClose, selectedUser, handleSave }) => {
  const [editedUser, setEditedUser] = useState(selectedUser);

  useEffect(() => {
    setEditedUser(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleSave(editedUser);
    onClose();
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 450, padding: 2, height: '100vh' }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <h2 className="text-2xl font-semibold">Edit User</h2>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>

        <div className="space-y-4 h-[calc(100vh-180px)] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                name="username"
                value={editedUser?.username || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select 
                name="role"
                value={editedUser?.role || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="admin">Admin</option>
                <option value="inventory">Inventory</option>
                <option value="sales">Sales</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={editedUser?.name || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={editedUser?.email || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                value={editedUser?.phone || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={editedUser?.password || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-200 border-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Box>
    </Drawer>
  );
};

export default EditUserModal;