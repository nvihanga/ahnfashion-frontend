import { useState } from 'react';
import { Drawer, Box, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

const AddUserModal = ({ isOpen, onClose, handleAdd }) => {
  const [newUser, setNewUser] = useState({
    username: '',
    role: 'ADMIN',
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    general: ''
  });
  

  const clearErrors = () => {
    setErrors({
      username: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      general: ''
    });
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      general: ''
    };

    // Username validation (3-50 chars)
    if (!newUser.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (newUser.username.length < 3 || newUser.username.length > 50) {
      newErrors.username = 'Username must be 3-50 characters';
      isValid = false;
    }

    // Name validation (3-100 chars)
    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (newUser.name.length < 3 || newUser.name.length > 100) {
      newErrors.name = 'Name must be 3-100 characters';
      isValid = false;
    }

    // Email validation (valid format + 100 chars max)
    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    } else if (newUser.email.length > 100) {
      newErrors.email = 'Email must be less than 100 characters';
      isValid = false;
    }

    // Phone validation (exactly 10 digits if provided)
    if (newUser.phone && !/^\d{10}$/.test(newUser.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
      isValid = false;
    }

    // Password validation (required only)
    if (!newUser.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    clearErrors();
    if (!validateFields()) return;

    try {
      await handleAdd(newUser);
      onClose();
    } catch (error) {
      const message = error.response?.data || error.message;
      if (message.includes('Username')) {
        setErrors(prev => ({ ...prev, username: message }));
      } else if (message.includes('Email')) {
        setErrors(prev => ({ ...prev, email: message }));
      } else {
        setErrors(prev => ({ ...prev, general: message }));
      }
    }
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
          {errors.general && (
            <div className="p-2 text-red-600 bg-red-100 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username*</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => {
                  setNewUser({...newUser, username: e.target.value});
                  setErrors(prev => ({ ...prev, username: '' }));
                }}
                className={`w-full p-2 border rounded ${
                  errors.username ? 'border-red-500' : ''
                }`}
                maxLength={50}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Role*</label>
              <select 
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="ADMIN">Admin</option>
                <option value="INVENTORY">Inventory</option>
                <option value="SALES">Sales</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name*</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => {
                  setNewUser({...newUser, name: e.target.value});
                  setErrors(prev => ({ ...prev, name: '' }));
                }}
                className={`w-full p-2 border rounded ${
                  errors.name ? 'border-red-500' : ''
                }`}
                maxLength={100}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => {
                  setNewUser({...newUser, email: e.target.value});
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
                className={`w-full p-2 border rounded ${
                  errors.email ? 'border-red-500' : ''
                }`}
                maxLength={100}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact No.</label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/\D/g, '');
                  setNewUser({...newUser, phone: numbersOnly.slice(0, 10)});
                  setErrors(prev => ({ ...prev, phone: '' }));
                }}
                className={`w-full p-2 border rounded ${
                  errors.phone ? 'border-red-500' : ''
                }`}
                
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password*</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => {
                  setNewUser({...newUser, password: e.target.value});
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
                className={`w-full p-2 border rounded ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
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