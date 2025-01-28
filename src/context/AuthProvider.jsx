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
        // localStorage.setItem('user', JSON.stringify(userData));
        // setUser(userData);

        const expiresAt = Date.now() + 3600000;
        const authData = { user: userData, expiresAt };
        // localStorage.setItem('user', JSON.stringify(authData));
        sessionStorage.setItem('user', JSON.stringify(authData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


