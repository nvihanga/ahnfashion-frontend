import React, { useState,useContext } from 'react';
import image2 from '../../assets/images/third.jpg';
import {useAuth} from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication and role assignment
    // const mockUsers = {
    //   admin: 'admin',
    //   inventory: 'inventory',
    //   sales: 'sales',
    // };

    const mockUsers = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'inventory', password: 'inventory123', role: 'inventory' },
        { username: 'sales', password: 'sales123', role: 'sales' },
      ];

      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

    // if (mockUsers[username] && password === 'password') {
    //   const role = mockUsers[username];
    //   setUser({ username, role }); // Save the logged-in user and their role

    if (user) {
        login(user);
        navigate(ROUTES.PROTECTED.DASHBOARD[user.role.toUpperCase()]);
  

      // Redirect to the appropriate dashboard based on role
      
  } else {
    alert('Invalid credentials!');
  }
  };
  

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${image2})`
      }}
    >
      {/* Semi-transparent overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Login Form */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Welcome Back to AHN Fashion
        </h2>
        <h3 className="text-gray-600 mb-6 text-center">
          Enter your Credentials to access your account
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:border-transparent"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md 
                     hover:bg-green-800 focus:outline-none focus:ring-2 
                     focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
