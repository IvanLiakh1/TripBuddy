import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const isAuthOK = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return false;
        }
        return true;
    } catch {
        localStorage.removeItem('token');
        return false;
    }
};

export const RequireAuth = ({ children }) => {
    if (!isAuthOK()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export const logout = () => {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
};
