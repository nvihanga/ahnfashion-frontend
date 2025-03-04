import React, { useEffect, useState } from 'react';
import UserSearchHeader from '../../components/setting/UserSearchHeader';
import UserTable from '../../components/setting/UserTable';
import Pagination from '../../components/setting/Pagination';
import EditUserModal from '../../components/setting/EditUserModal';
import ViewUserModal from '../../components/setting/ViewUserModal';
import AddUserModal from '../../components/setting/AddUserModal';
import { useAuth } from '../../hooks/useAuth';

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
  //const [users, setUsers] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/v1/user/get-all-user');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Fetch users error:', error);
      }
    };
    if(user?.role === 'admin') fetchUsers();
  }, [user]);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };
  const [users] = useState([

    {
      id: 1,
      username: 'admin',
      name: 'Thilina',
      email: 'thilina@gmail.com',
      phone: '0779873456',
      role: 'admin',
      status: 'active',
      createdAt: '2023-01-15',
      updatedAt: '2023-12-01',
      password: 'thilina566'
    },
    {
      id: 1,
      username: 'admin',
      name: 'Supun',
      email: 'supun@gmail.com',
      phone: '0775123980',
      role: 'admin',
      status: 'active',
      createdAt: '2023-01-15',
      updatedAt: '2023-12-01',
      password: 'supun789'
    },
    {
      id: 1,
      username: 'inventory',
      name: 'Nethmi',
      email: 'nethmi@gmail.com',
      phone: '0712346780',
      role: 'inventory',
      status: 'active',
      createdAt: '2023-01-15',
      updatedAt: '2023-12-01',
      password: 'nethmi908'
    },
    {
      id: 1,
      username: 'sales',
      name: 'Sudhari',
      email: 'sudhari@gmail.com',
      phone: '0713567908',
      role: 'sales',
      status: 'active',
      createdAt: '2023-01-15',
      updatedAt: '2023-12-01',
      password: 'sudhari765'
    },
    {
      id: 1,
      username: 'admin',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      role: 'admin',
      status: 'active',
      createdAt: '2023-01-15',
      updatedAt: '2023-12-01',
      password: 'securepassword'
    },
    {
      id: 1,
      username: 'admin',
      name: 'Ishani',
      email: 'ishani@gmail.com',
      phone: '0754123789',
      role: 'admin',
      status: 'active',
      createdAt: '2023-01-15',
      updatedAt: '2023-12-01',
      password: 'ishani789'
    },
    // Add more mock users as needed
  ]);
  const handleAddUser = (newUser) => {
    // In a real app, you would make an API call here
    setUsers(prev => [...prev, newUser]);
  };

  // Filter users based on search query
  
//   const handleAddUser = async (newUser) => {
//     try {
//       await api.post('/api/v1/user/register', newUser);
//       // Refresh user list
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };
  
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

  const handleDelete = (user) => {
    console.log('Delete user:', user); // Implement actual delete logic
  };

  const handleSave = (updatedUser) => {
    console.log('Save user:', updatedUser); // Implement actual save logic
    setIsEditOpen(false);
  };

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleNextPage = () => endIndex < filteredUsers.length && setCurrentPage(p => p + 1);

  return (
    <div className="p-6 overflow-hidden">
      <UserSearchHeader 
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        selectedUsers={selectedUsers}
        onAdd={() => setIsAddOpen(true)}
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
