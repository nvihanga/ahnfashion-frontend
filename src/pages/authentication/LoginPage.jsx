import React, { useState,useContext } from 'react';
import image from '../../assets/images/sec.jpg';
import {useAuth} from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const navigate = useNavigate();

const getDashboardPath = (role) => {
    const rolePaths = {
      ADMIN: ROUTES.PROTECTED.DASHBOARD.ADMIN,
      INVENTORY: ROUTES.PROTECTED.DASHBOARD.INVENTORY,
      SALES: ROUTES.PROTECTED.DASHBOARD.SALES,
    };
    return rolePaths[role.toUpperCase()] || ROUTES.PUBLIC.LOGIN;
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/authentication', {
        username,
        password
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const { jwtToken, role, username: responseUsername } = response.data;
      
      sessionStorage.setItem('user', JSON.stringify({
        user: {
          token: jwtToken,
          username: responseUsername,
          role,
        },
        expiresAt: Date.now() + 3600000
      }));

      login({
        username: responseUsername,
        role,
        token: jwtToken
      });
      const dashboardPath = getDashboardPath(role);
      // Redirect based on role
      navigate(dashboardPath);
    }catch (error) {
        console.error('Login error:', error);
        alert(
          error.response?.data?.message || 
          'Login failed. Please check your credentials and try again.'
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-4 ">
            <div className="flex w-auto max-w-6xl  rounded-2xl overflow-hidden h-[90vh] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transform transition-all duration-300 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] hover:-translate-y-2">
                {/* Left side - Login Form */}
                <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back to AHN Fashion
                        </h2>
                        <h3 className="text-gray-600 mb-6">
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

                {/* Right side - Image */}
                <div className="hidden md:block md:w-1/2 ">
                    <img
                        src={image}
                        alt="Fashion workshop"
                        className="w-full h-full object-cover"
                        style={{
                            backgroundPosition: 'left-center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                </div>
            </div>
        </div>
  );
};

export default LoginPage;
