import React, { useEffect, useState } from 'react';
import UserSearchHeader from '../../components/setting/UserSearchHeader';
import UserTable from '../../components/setting/UserTable';
import Pagination from '../../components/setting/Pagination';
import EditUserModal from '../../components/setting/EditUserModal';
import ViewUserModal from '../../components/setting/ViewUserModal';
import AddUserModal from '../../components/setting/AddUserModal';
import { useAuth } from '../../hooks/useAuth';
import userApi from '../../api/userApi';
import ConfirmationDialog from '../../components/setting/ConfirmationDialog';

const Setting = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedDeleteIds, setSelectedDeleteIds] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);


useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await userApi.getAll();
      if (response.status !== 200) {
        throw new Error('Failed to fetch users');
      }
      
      const backendUsers = response.data.data.map(user => ({
        id: user.userId,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.contactNo?.join(', ') || '',
        role: user.role,
        status: user.active ? 'active' : 'inactive',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
      setUsers(backendUsers);
    } catch (error) {
      console.error('Fetch users error:', error);
      alert('Failed to load users. Check network connection');
    }
  };
  if (user?.role === 'admin') fetchUsers();
}, [user]);

  // Update the getUserById API call mapping
const handleView = async (user) => {
  try {
    const response = await userApi.getById(user.id);
    const userDetails = {
      ...response.data.data,
      id: response.data.data.userId,
      status: response.data.data.active ? 'active' : 'inactive',
      phone: response.data.data.contactNo?.join(', ') || ''
    };
    setSelectedUser(userDetails);
    setIsViewOpen(true);
  } catch (error) {
    console.error('Error fetching user details:', error);
    alert('Failed to load user details');
  }
};

  const handleAddUser = async (newUser) => {
    try {
      const userData = {
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        contactNo: [newUser.phone], // Convert string to array
        role: newUser.role
      };
  
      const response = await userApi.createUser(userData);
      // Add the created user with proper mapping
      setUsers(prev => [...prev, {
        ...response.data.data,
        id: response.data.data.userId,
        phone: response.data.data.contactNo.join(', ')
      }]);
    } catch (error) {
      console.error('Error details:', error.response?.data);
      alert(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const filtered = users.filter(user =>
      Object.values(user).some(value =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, users]);

  // Pagination calculations
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const calculatePaginationDisplay = () => {
    if (filteredUsers.length === 0) return '0-0 of 0';
    const start = startIndex + 1;
    const end = Math.min(endIndex, filteredUsers.length);
    return `${start}-${end} of ${filteredUsers.length}`;
  };

  // Handler functions
  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleSelectAll = (e) => {
    setSelectedUsers(e.target.checked ? displayedUsers.map(u => u.id) : []);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => prev.includes(userId)
      ? prev.filter(id => id !== userId)
      : [...prev, userId]
    );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };


  const handleDelete = (userToDelete) => {
    setSelectedDeleteIds([userToDelete.id]);
    setIsBulkDelete(false);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    setSelectedDeleteIds([...selectedUsers]);
    setIsBulkDelete(true);
    setDeleteConfirmationOpen(true);
  };

  // Add actual delete handler
  const handleConfirmDelete = async () => {
    try {
      const results = await Promise.allSettled(
        selectedDeleteIds.map(id => userApi.deleteUser(id))
      );

      const failedDeletions = results.filter(r => r.status === 'rejected');
      if (failedDeletions.length > 0) {
        throw new Error(`${failedDeletions.length} deletions failed`);
      }

      setUsers(prev => prev.filter(user => !selectedDeleteIds.includes(user.id)));
      setSelectedUsers(prev => prev.filter(id => !selectedDeleteIds.includes(id)));
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting users:', error);
      alert(`Partial failure: ${error.message}`);
    }
  };

// Update delete button in UserSearchHeader:
<button
  className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
  disabled={selectedUsers.length === 0}
  onClick={handleDeleteSelected}
>
  Delete Selected
</button>

  const handleSave = async (updatedUser) => {
    try {
      const userData = {
        username: updatedUser.username,
        name: updatedUser.name,
        email: updatedUser.email,
        contactNo: [updatedUser.phone], // Convert string to array
        role: updatedUser.role,
        password: updatedUser.password
      };
  
      const response = await userApi.updateUser(updatedUser.id, userData);
      // Update with mapped data
      setUsers(prev =>
        prev.map(user =>
          user.id === updatedUser.id ? {
            ...response.data.data,
            id: response.data.data.userId,
            phone: response.data.data.contactNo?.join(', ') || ''
          } : user
        )
      );
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.response?.data?.message || 'Error updating user');
    }
  };


  const handlePrevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNextPage = () => endIndex < filteredUsers.length && setCurrentPage(p => p + 1);

  return (
    <div className="p-6 overflow-hidden">
      < div className = "flex justify-between items-center mb-6" >
        <p className="font-bold text-[18px]" >User Management</p>
        
      </div>
      <div style={{ width: '100%', height: '2px', backgroundColor: '#ddd', margin: '0 0 20px 0' }}></div>


      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${isBulkDelete ? 'selected' : 'this'} user${selectedDeleteIds.length > 1 ? 's' : ''}?`}
      />
      <UserSearchHeader
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        selectedUsers={selectedUsers}
        onAdd={() => setIsAddOpen(true)}
        onDeleteSelected={handleDeleteSelected}
      />

      <AddUserModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        handleAdd={handleAddUser}
      />

      <div className="max-w-full">
        <UserTable
          displayedUsers={displayedUsers}
          selectedUsers={selectedUsers}
          handleSelectAll={handleSelectAll}
          handleSelectUser={handleSelectUser}
          handleEdit={handleEdit}
          handleView={handleView}
          handleDelete={handleDelete}
        />
      </div>
      <ViewUserModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        user={selectedUser}
      />

      <Pagination
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        filteredUsers={filteredUsers}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
        calculatePaginationDisplay={calculatePaginationDisplay}
      />

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        selectedUser={selectedUser}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Setting;
