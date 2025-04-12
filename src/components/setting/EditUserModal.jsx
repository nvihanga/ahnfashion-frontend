import { useState, useEffect } from 'react';
import { Drawer, Box, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

const EditUserModal = ({ isOpen, onClose, selectedUser, handleSave }) => {
  const [editedUser, setEditedUser] = useState(selectedUser);
  const [errors, setErrors] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    general: ''
  });

  useEffect(() => {
    setEditedUser(selectedUser);
    setErrors({ username: '', name: '', email: '', phone: '', general: '' });
  }, [selectedUser]);

  const clearErrors = () => {
    setErrors({
      username: '',
      name: '',
      email: '',
      phone: '',
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
      general: ''
    };

    // Username validation (3-50 chars)
    if (!editedUser.username?.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (editedUser.username.length < 3 || editedUser.username.length > 50) {
      newErrors.username = 'Username must be 3-50 characters';
      isValid = false;
    }

    // Name validation (3-100 chars)
    if (!editedUser.name?.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (editedUser.name.length < 3 || editedUser.name.length > 100) {
      newErrors.name = 'Name must be 3-100 characters';
      isValid = false;
    }

    // Email validation (valid format + 100 chars max)
    if (!editedUser.email?.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedUser.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    } else if (editedUser.email.length > 100) {
      newErrors.email = 'Email must be less than 100 characters';
      isValid = false;
    }

    // Phone validation (exactly 10 digits if provided)
    if (editedUser.phone && !/^\d{10}$/.test(editedUser.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    clearErrors();
    if (!validateFields()) return;

    try {
      await handleSave(editedUser);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number
    const processedValue = name === 'phone'
      ? value.replace(/\D/g, '').slice(0, 10)
      : value;

    setEditedUser(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
          {errors.general && (
            <div className="p-2 text-red-600 bg-red-100 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username*</label>
              <input
                name="username"
                value={editedUser?.username || ''}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : ''
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
                name="role"
                value={editedUser?.role || ''}
                onChange={handleChange}
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
                name="name"
                value={editedUser?.name || ''}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''
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
                name="email"
                type="email"
                value={editedUser?.email || ''}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''
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
                name="phone"
                type="tel"
                value={editedUser?.phone || ''}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''
                  }`}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={editedUser?.password || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="New password"
              />
              <span className="text-xs text-gray-500 mt-1 block">
                Leave empty to keep current password
              </span>
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