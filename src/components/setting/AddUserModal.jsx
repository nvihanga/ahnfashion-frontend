import { useState } from 'react';
import { Drawer, Box, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

const AddUserModal = ({ isOpen, onClose, handleAdd }) => {
  const [newUser, setNewUser] = useState({
    username: '',
    role: 'editor',
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert('Please fill in all required fields');
      return;
    }
    
    handleAdd({
      ...newUser,
      id: Math.floor(Math.random() * 1000),
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 450, padding: 2, height: '100vh' }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <h2 className="text-2xl font-semibold">Add New User</h2>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>

        <div className="space-y-4 h-[calc(100vh-180px)] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username*</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Role*</label>
              <select 
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
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
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password*</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                className="w-full p-2 border rounded"
                required
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
            Add User
          </button>
        </div>
      </Box>
    </Drawer>
  );
};
export default AddUserModal;