// src/component/auth/verifyJWT.js
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const isAuthOK = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return null;
        }
        return decodedToken;
    } catch {
        localStorage.removeItem('token');
        return null;
    }
};

export const RequireAuth = ({ children }) => {
    const user = isAuthOK();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

// export const logout = () => {
//     localStorage.removeItem('token');
//     const navigate = useNavigate();
//     navigate('/login', { replace: true });
// };
