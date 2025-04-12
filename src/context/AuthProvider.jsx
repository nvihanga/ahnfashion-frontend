import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {  
            try {
                const storedAuth = sessionStorage.getItem('user');
                if(storedAuth){
                    const {user: storedUser, expiresAt} = JSON.parse(storedAuth);

                    if(Date.now() < expiresAt){
                        setUser(storedUser);
                    }else{
                        localStorage.removeItem('user');
                    }
                }
                
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, []);

    
const login = (userData) => {
    const normalizedUser = {
      ...userData,
      role: userData.role.toLowerCase() // Convert to lowercase
    };
    
    sessionStorage.setItem('user', JSON.stringify({
      user: normalizedUser,
      expiresAt: Date.now() + 3600000,
      token: localStorage.getItem('token')
    }));
    setUser(normalizedUser);
  };
    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


